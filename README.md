# XARA CORTEX HOLDINGS INC.

Premium single-page corporate website for XARA CORTEX HOLDINGS INC. — a technology holding company focused on AI, geospatial, market intelligence, and digital trust platforms.

## Overview

This is a pnpm monorepo containing the corporate marketing site, an Express API server (with a Resend-powered contact form), and a mockup sandbox for component previews.

## Artifacts

- **`artifacts/xara-cortex`** — React + Vite marketing site (the public-facing corporate page)
- **`artifacts/api-server`** — Express 5 API server, exposes `POST /api/contact` for the contact form
- **`artifacts/mockup-sandbox`** — Isolated component preview server used during design iteration

## Stack

- **Monorepo**: pnpm workspaces
- **Runtime**: Node.js 24
- **Language**: TypeScript 5.9
- **Frontend**: React + Vite, Tailwind CSS, shadcn/ui
- **Backend**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Email**: Resend
- **Build**: esbuild

## Brand

- **Headline navy**: `#0E1A33`
- **Brand blue**: `#1344D3` (hover `#103BB8`)
- **Dark accent**: `#5A7EF0`
- **Light surface**: `#F5F7FB`
- **Type**: Montserrat (display) + Inter (body)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/xara-cortex run dev` — run the marketing site
- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm --filter @workspace/mockup-sandbox run dev` — run the component preview server
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Environment

The contact form requires a Resend connection. The API server reads the Resend API key and verified sender from the configured Resend integration; submissions are delivered to the configured recipient.

## Project Structure

```
artifacts/
  xara-cortex/      # Marketing site (React + Vite)
  api-server/       # Express API + Resend contact endpoint
  mockup-sandbox/   # Component preview server
lib/                # Shared workspace libraries
scripts/            # Workspace scripts
```
