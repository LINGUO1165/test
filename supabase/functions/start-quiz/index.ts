const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json(405, { error: "Method not allowed" });

  const projectUrl = Deno.env.get("SUPABASE_URL");
  const secretKeys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}") as Record<string, string>;
  const publishableKeys = JSON.parse(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS") || "{}") as Record<string, string>;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || secretKeys.default;
  const acceptedClientKeys = [Deno.env.get("SUPABASE_ANON_KEY"), ...Object.values(publishableKeys)].filter(Boolean);
  const rateSalt = Deno.env.get("QUIZ_RATE_LIMIT_SALT");
  if (!projectUrl || !serviceKey || acceptedClientKeys.length === 0 || !rateSalt) {
    return json(500, { error: "服务尚未完成配置，请稍后再试。" });
  }
  if (!acceptedClientKeys.includes(request.headers.get("apikey") || "")) return json(401, { error: "请求未通过校验。" });

  let body: { password?: unknown };
  try { body = await request.json(); } catch { return json(400, { error: "请求内容无效。" }); }
  if (typeof body.password !== "string" || body.password.length < 1 || body.password.length > 128) {
    return json(400, { error: "请输入有效密码。" });
  }

  const forwarded = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "unknown";
  const ip = forwarded.split(",")[0].trim().slice(0, 100);
  const [passwordHash, rateKey] = await Promise.all([
    sha256(body.password),
    sha256(`${rateSalt}:${ip}`),
  ]);

  const rpc = await fetch(`${projectUrl}/rest/v1/rpc/consume_quiz_password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": serviceKey,
      "Authorization": `Bearer ${serviceKey}`,
    },
    body: JSON.stringify({ p_password_hash: passwordHash, p_rate_key: rateKey }),
  });
  if (!rpc.ok) {
    console.error("consume_quiz_password RPC failed", rpc.status);
    return json(503, { error: "暂时无法核对密码，请稍后重试。" });
  }
  const outcome = await rpc.json();
  if (outcome.code === "rate_limited") return json(429, { error: "尝试次数过多，请 10 分钟后再试。" });
  if (outcome.code === "exhausted") return json(429, { error: "这个密码的 3 次测试机会已用完。" });
  if (!outcome.ok) return json(401, { error: "密码不正确，请核对后再试。" });
  return json(200, { remaining: outcome.remaining });
});
