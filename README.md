# Persona

Remember the little things about people you care about.

Persona is a mobile-first PWA that helps you build an evolving portrait of the people in your life. Tell it something in natural language — it understands, structures, and remembers.

## Setup

1. Clone the repo and install dependencies:
   ```bash
   pnpm install
   ```

2. Copy `.env.example` to `.env` and fill in:
   ```
   DATABASE_URL=         # Neon PostgreSQL connection string
   AUTH_SECRET=          # Random 32+ char string: openssl rand -base64 32
   OPENROUTER_API_KEY=   # From openrouter.ai
   OPENROUTER_MODEL=     # e.g. openai/gpt-4o-mini
   NEXTAUTH_URL=         # http://localhost:3000 for dev
   ```

3. Push the database schema:
   ```bash
   pnpm db:push
   ```

4. (Optional) Load demo data:
   ```bash
   pnpm db:seed
   ```
   Login: `demo@persona.app` / `demo1234`

5. Start the dev server:
   ```bash
   pnpm dev
   ```

## Tech Stack

Next.js 16 · TypeScript · Tailwind CSS v4 · Drizzle ORM · Neon PostgreSQL · Auth.js v5 · OpenRouter · Framer Motion

## Architecture

- **Server Components** for all data reads
- **Server Actions** for mutations (add person, save memory)
- **Route Handler** (`/api/ai/process`) for AI pipeline
- **AI abstraction** (`lib/ai/`) — swap providers by editing one file
- Raw user input is always preserved — LLM summaries are derived, never the source of truth
