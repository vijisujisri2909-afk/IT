# Northstar company website

A responsive React website scaffolded with Vite and styled with Tailwind CSS.
It includes services, about, FAQ, and contact sections, plus a Gemini-powered
FAQ generator and chat assistant.

## Run locally

```sh
npm install
Copy-Item .env.example .env.local
```

Set `VITE_GEMINI_API_KEY` in `.env.local`, then start the dev server:

```sh
npm run dev
```

Without an API key the site still runs and shows sample FAQs; Gemini chat and
FAQ generation display a setup message. Restart Vite after changing the local
environment file.

## Production note

Vite client-side environment variables are included in browser code. A
`VITE_GEMINI_API_KEY` is therefore visible to visitors; use a restricted,
quota-limited development key only for local prototyping. For production,
proxy Gemini requests through a server-side endpoint that keeps the key secret.

Run `npm run build` to create the production bundle.
