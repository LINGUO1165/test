# 短剧角色测评网站

移动端优先的趣味测评网站。生产部署目标：GitHub Pages 托管静态前端，Supabase Edge Function 校验密码，Supabase Postgres 原子计数每个密码的三次额度。

## 本地预览

需要 Node.js 18 或更新版本，无 npm 依赖。

```powershell
node server.js
```

打开 `http://localhost:4173`。本地开发服务使用 `QUIZ_PASSWORDS` 环境变量配置逗号分隔的密码；默认 `888888`。计数存入 `data/usage.json`。这只是本地开发模式，不会连接 Supabase。

## 部署组成

- `public/`：GitHub Pages 前端。
- `supabase/migrations/`：数据库表、额度 RPC、IP 请求限流。
- `supabase/functions/start-quiz/`：Edge Function。服务角色密钥只留在 Supabase，不下发到浏览器。
- `.github/workflows/pages.yml`：推送到 `main` 后发布 Pages，并从 GitHub Actions secrets 写入前端公开配置。

前端只保存四项维度分数到分享链接；长图只绘制公开结果内容。作答答案留在当前浏览器页面内，结果页的“积分来源”可以逐维度展开查看；它不被序列化进分享 URL，也不传给 Supabase。

## 需要在 GitHub / Supabase 控制台完成的配置

1. 在 Supabase 创建项目。
2. 在 Supabase SQL Editor 执行 `supabase/migrations/202610110001_quiz_passwords.sql`。
3. 为每个访问密码插入一条**哈希**记录（替换示例中的密码；不要提交含真实密码的 SQL 文件）：

   ```sql
   insert into public.quiz_passwords (password_hash, max_uses)
   values (encode(extensions.digest(convert_to('替换成你的密码', 'UTF8'), 'sha256'), 'hex'), 3);
   ```

   每个密码各执行/添加一条。只把随机且足够长的密码发给用户；数据库不会保存明文。
4. 在 Supabase 部署 Edge Function `start-quiz`。Supabase CLI 的参考命令：

   ```powershell
   npx supabase login
   npx supabase link --project-ref 你的项目引用
   npx supabase secrets set QUIZ_RATE_LIMIT_SALT="一段随机长字符串"
   npx supabase functions deploy start-quiz --no-verify-jwt
   ```

   函数会使用 Supabase 提供的 `SUPABASE_URL`、`SUPABASE_ANON_KEY` 和 `SUPABASE_SERVICE_ROLE_KEY` 环境变量。不要把 `SERVICE_ROLE_KEY` 放进 GitHub 或前端。
5. 在 GitHub 仓库 Settings → Secrets and variables → Actions 新建两个 repository secrets：
   - `QUIZ_SUPABASE_FUNCTION_URL`：`https://你的项目引用.supabase.co/functions/v1/start-quiz`
   - `QUIZ_SUPABASE_ANON_KEY`：Supabase 项目 API 设置中的 anon/publishable key（可公开使用的客户端 key）。
6. 在 GitHub 仓库 Settings → Pages 将 Build and deployment source 设为 **GitHub Actions**。工作流成功后，GitHub Actions 页面会显示公开网址。

如果你不在本机使用 Supabase CLI，也可以在 Supabase Dashboard 的 Edge Functions 页面创建并部署同名函数；数据库 SQL 仍需在 SQL Editor 执行。部署时必须启用公开函数调用（工作流端点带 `--no-verify-jwt`）；函数自身会核对 anon key、限制 IP 请求频率，并由服务端调用受限的数据库 RPC。

## 重要说明

- 密码额度在数据库中原子增加；两个设备同时提交最后一次额度时，也只有一个请求能成功。
- 每个 IP 每 10 分钟最多尝试 20 次，避免公开端点被无限猜码。可在迁移 SQL 中调整阈值。
- 结果分享链接包含四项分数和由此生成的结果；拿到链接的人可以看到结果，请用户自行选择是否分享。
- 手机保存图片取决于浏览器能力：支持文件分享的浏览器打开系统分享面板，用户需自行选择保存；否则下载 PNG 后从下载文件保存到相册。公网需要 HTTPS。
- GitHub Pages 前端公开；Supabase anon/publishable key 也会在浏览器可见，安全边界由数据库权限和 Edge Function 服务端密钥保证。
- 上线前需在 Supabase 建项目、登记密码、部署函数，并在 GitHub 配置两个 Actions secrets。未配置这些服务前，GitHub Pages 前端不能验证生产密码。
- 测评是娱乐性自评初稿，未通过心理测量验证；不用于心理诊断。
