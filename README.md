# YallaTalk Voice AI Landing Page

A premium Next.js 15 landing page featuring integrated Vapi AI voice assistant with mobile-responsive design and modern animations.

## Features

- 🎤 **Vapi AI Voice Assistant** - Integrated voice and text chat interface
- 📱 **Mobile Responsive** - Optimized for all devices with full-screen mobile chat
- ⚡ **Modern Design** - Framer Motion animations and gradients
- 🔒 **Secure Configuration** - Server-side API routes for sensitive data
- 🎨 **Professional UI** - Clean, modern interface with dark theme
- 🌟 **Interactive Elements** - Smooth animations and hover effects

## Environment Variables

For security, this application uses server-side environment variables that are NOT exposed to the client. When deploying to Vercel, set these variables in your project settings:

```bash
# Required for Vapi AI integration
VAPI_ASSISTANT_ID=your_vapi_assistant_id
VAPI_PUBLIC_API_KEY=your_vapi_public_api_key
AGENT_NAME="YallaTalk Assistant"
```

⚠️ **Important**: Never use `NEXT_PUBLIC_` prefix for sensitive API keys as they will be exposed to the client-side bundle and visible to users.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
