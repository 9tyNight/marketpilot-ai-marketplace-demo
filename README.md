# MarketPilot AI Marketplace Demo

Interactive proposal demo for an AI-driven marketplace MVP. It shows the product surface I would use before wiring real services: job intake, AI provider matching, payment/escrow states, provider shortlist, and backend readiness.

## What it demonstrates

- Marketplace intake and AI-assisted provider matching
- Stripe-style escrow/payment state handling
- Provider shortlist and admin review workflow
- Backend service map for Nest.js, PostgreSQL, webhooks, auth, and AWS deployment
- React/Vite prototype with interactive tabs, state changes, and responsive dashboard layout

## Real MVP stack alignment

- Frontend: Next.js, React, TypeScript, Tailwind-ready component structure
- Backend: Nest.js or Node.js API with validation, role checks, queues, and webhooks
- Database: PostgreSQL tables for jobs, providers, contracts, payments, and audit events
- Payments: Stripe Checkout, PaymentIntents or escrow-like milestone flow, webhook reconciliation
- AI: AI API integration for requirements extraction, provider ranking, risk review, and admin notes
- Deployment: AWS or equivalent managed infrastructure with environment config, logs, and monitoring

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```
