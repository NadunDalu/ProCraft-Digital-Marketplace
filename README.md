# ProCraft Digital Marketplace

This is a Next.js 15 project for a digital products marketplace with a modern UI built using Tailwind CSS and Radix UI.

Key features:
- Product listings and detail pages
- Shopping cart UX (client-side)
- Customer reviews and giveaways sections
- Basic AI integration via Genkit + Google AI

Admin panel
------------

An admin UI is available at /admin which stores site settings in the browser's localStorage (for now). You can change the site title, featured products, and local AI model selection there.

Enabling GPT-5
--------------

The project reads the AI model name from environment variables. To enable GPT-5 for clients (local), add the following to your `.env` file:

NEXT_PUBLIC_AI_MODEL=gpt-5

Note: This only configures the model used by the GenKit client plugin. Ensure your GenKit / Google AI account supports the requested model.

Getting started:
1. Install dependencies
2. Run the dev server and open the app

See `src/app/page.tsx` to start exploring the code.
