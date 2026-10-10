create extension if not exists pgcrypto with schema extensions;

create table if not exists public.quiz_passwords (
  password_hash text primary key check (length(password_hash) = 64),
  max_uses integer not null default 3 check (max_uses > 0),
  used_count integer not null default 0 check (used_count >= 0 and used_count <= max_uses),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_rate_limits (
  rate_key text primary key,
  window_started_at timestamptz not null default now(),
  attempts integer not null default 0
);

alter table public.quiz_passwords enable row level security;
alter table public.quiz_rate_limits enable row level security;
revoke all on public.quiz_passwords from anon, authenticated;
revoke all on public.quiz_rate_limits from anon, authenticated;

create or replace function public.consume_quiz_password(p_password_hash text, p_rate_key text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_attempts integer;
  v_used integer;
  v_max integer;
begin
  insert into public.quiz_rate_limits as current_limit(rate_key, window_started_at, attempts)
  values (p_rate_key, now(), 1)
  on conflict (rate_key) do update
    set attempts = case
          when current_limit.window_started_at < now() - interval '10 minutes' then 1
          else current_limit.attempts + 1
        end,
        window_started_at = case
          when current_limit.window_started_at < now() - interval '10 minutes' then now()
          else current_limit.window_started_at
        end
  returning attempts into v_attempts;

  if v_attempts > 20 then
    return jsonb_build_object('ok', false, 'code', 'rate_limited');
  end if;
  if v_attempts = 1 then
    delete from public.quiz_rate_limits where window_started_at < now() - interval '1 day';
  end if;

  update public.quiz_passwords
     set used_count = used_count + 1
   where password_hash = p_password_hash
     and active
     and used_count < max_uses
  returning used_count, max_uses into v_used, v_max;

  if not found then
    if exists (select 1 from public.quiz_passwords where password_hash = p_password_hash and active) then
      return jsonb_build_object('ok', false, 'code', 'exhausted');
    end if;
    return jsonb_build_object('ok', false, 'code', 'invalid');
  end if;

  return jsonb_build_object('ok', true, 'remaining', v_max - v_used);
end;
$$;

revoke all on function public.consume_quiz_password(text, text) from public, anon, authenticated;
grant execute on function public.consume_quiz_password(text, text) to service_role;

comment on table public.quiz_passwords is 'Stores SHA-256 hashes of access codes and their usage quotas; never store plaintext codes.';
