# YallaTalk Landing Page - Product Requirements Document (Next.js)

## Project Overview

Create a premium YallaTalk voice AI business landing page with integrated Vapi voice chat widget, featuring modern design, smooth animations, and seamless voice interaction capabilities using Next.js with App Router.

## Environment Variables Setup

The app uses environment variables to keep configuration flexible and secure. In Next.js, environment variables are automatically available in your code.

**Required Environment Variables (.env.local):**

```bash
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your_vapi_assistant_id
NEXT_PUBLIC_VAPI_PUBLIC_API_KEY=your_vapi_public_api_key  
NEXT_PUBLIC_AGENT_NAME=YallaTalk Assistant
```

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Technical Stack

- **Framework**: Next.js 14+ with App Router + TypeScript
- **Styling**: Tailwind CSS + Framer Motion animations
- **UI Components**: shadcn/ui component library
- **Voice Integration**: Vapi AI voice widget
- **Deployment**: Vercel (recommended for Next.js)

## Directory Structure (Next.js Defaults)

```
voice-ai-landing/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── favicon.ico
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── shape-landing-hero.tsx
│   ├── Navbar.tsx
│   ├── VapiWidget.tsx
│   ├── AudioWaveform.tsx
│   ├── ServiceCard.tsx
│   └── Footer.tsx
├── lib/
│   └── utils.ts
├── config/
│   └── vapi.ts
├── public/
└── next.config.js
```

## Key Features & Implementation Steps

### 1. Project Setup & Dependencies

**Installation:**
```bash
npx create-next-app@latest voice-ai-landing --typescript --tailwind --eslint --app
cd voice-ai-landing
npm install framer-motion lucide-react
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card
```

### 2. Core Components Structure

#### Navigation Component (`components/Navbar.tsx`)

**Features:**
- Fixed position with scroll-based backdrop blur effect
- Animated logo with gradient styling
- Responsive navigation menu
- Smooth fade-in animation on load

#### Hero Section (`components/ui/shape-landing-hero.tsx`)

**Features:**
- Animated geometric shapes with floating effects
- Gradient text effects and backdrop blur
- Staggered animation entrance
- Responsive typography scaling
- Clean call-to-action focused on voice interaction

#### Supporting Components
- `AudioWaveform.tsx` - Visual audio representation
- `ServiceCard.tsx` - Animated service feature cards
- `Footer.tsx` - Standard footer with branding
- `Marquee.tsx` - Scrolling text marquee for feature highlights

### 3. Vapi Voice Integration Setup

#### Environment Variables Configuration (`config/vapi.ts`)

```typescript
export const vapiConfig = {
  assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || '',
  publicApiKey: process.env.NEXT_PUBLIC_VAPI_PUBLIC_API_KEY || '',
  agentName: process.env.NEXT_PUBLIC_AGENT_NAME || 'Coach',
  buttonConfig: {
    position: "bottom-right" as const,
    offset: "40px",
    width: "50px", 
    height: "50px",
    idle: {
      color: "rgb(20, 184, 166)", // Match theme color
      type: "pill" as const,
      title: `Chat with ${process.env.NEXT_PUBLIC_AGENT_NAME || 'YallaTalk Assistant'}`,
      subtitle: "Talk with us",
      icon: "https://unpkg.com/lucide-static@0.321.0/icons/phone.svg"
    }
  }
};
```

#### Client Component Integration (`components/VapiWidget.tsx`)

```typescript
'use client';

import { useEffect } from 'react';
import { vapiConfig } from '../config/vapi';

declare global {
  interface Window {
    vapiSDK: any;
  }
}

export const VapiWidget = () => {
  useEffect(() => {
    // Only load if we have the required environment variables
    if (!vapiConfig.assistantId || !vapiConfig.publicApiKey) {
      console.warn('Vapi configuration missing. Please set environment variables.');
      return;
    }

    // Load Vapi SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js';
    script.defer = true;
    script.async = true;
    
    script.onload = () => {
      if (window.vapiSDK) {
        window.vapiSDK.run({
          apiKey: vapiConfig.publicApiKey,
          assistant: vapiConfig.assistantId,
          config: vapiConfig.buttonConfig,
        });
      }
    };
    
    document.head.appendChild(script);
    
    // Position fix for Vapi button
    const fixVapiButton = () => {
      const vapiBtn = document.querySelector('.vapi-btn') as HTMLElement;
      if (vapiBtn) {
        vapiBtn.style.position = 'fixed';
        vapiBtn.style.zIndex = '9999';
        clearInterval(checkExist);
      }
    };
    
    const checkExist = setInterval(fixVapiButton, 100);
    
    return () => {
      clearInterval(checkExist);
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);
  
  return null; // This component doesn't render anything
};
```

### 4. App Router Layout (`app/layout.tsx`)

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { VapiWidget } from '@/components/VapiWidget'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YallaTalk - Voice AI Solutions',
  description: 'Premium voice AI solutions for modern businesses with YallaTalk',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <VapiWidget />
      </body>
    </html>
  )
}
```

### 5. Main Page (`app/page.tsx`)

```typescript
import { Navbar } from '@/components/Navbar'
import { ShapeLandingHero } from '@/components/ui/shape-landing-hero'
import { AudioWaveform } from '@/components/AudioWaveform'
import { ServiceCard } from '@/components/ServiceCard'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      <ShapeLandingHero />
      <AudioWaveform />
      <section className="py-20">
        {/* Service cards section */}
      </section>
      <Footer />
    </main>
  )
}
```

### 6. Design System & Styling

#### Color Palette
- **Primary**: Teal-500 (`rgb(20, 184, 166)`)
- **Background**: Gray-900 (dark theme)
- **Text**: White with opacity variations
- **Accents**: Indigo-500 for secondary elements

#### Typography
- **Font**: Inter (Next.js font optimization)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive scaling**: 4xl → 6xl → 7xl → 8xl

#### Animation Patterns
- **Entrance**: Staggered fade-up with delays
- **Hover**: Smooth color transitions
- **Floating**: Continuous y-axis movement for shapes
- **Scroll**: Backdrop blur activation
- **Marquee**: Infinite horizontal scroll with linear timing

### 7. Content Structure

#### Page Sections
1. **Hero** - Main value proposition with voice interaction focus
   - Animated geometric shapes background
   - YallaTalk branding and gradient text
   - Call-to-action buttons
   - Trust indicators with company logos
   - **Marquee** - Scrolling text featuring key capabilities
2. **Audio Visualization** - Visual appeal and tech demonstration
3. **Services** - Feature cards with icons and descriptions
4. **About** - Company/technology explanation
5. **Call-to-Action** - Voice interaction encouragement
6. **Footer** - Brand reinforcement

#### Marquee Component Features
- Seamless infinite scroll animation
- Customizable speed and content
- Highlights key features: "Real-time Voice Processing", "Multi-language Support", "24/7 AI Availability", etc.
- Positioned below trust indicators in hero section
- Styled with border top/bottom and proper spacing

### 8. Environment Variables for Development

#### Development Setup
Create `.env.local` file in root directory:

```bash
# Vapi Configuration (will be empty during development)
NEXT_PUBLIC_VAPI_ASSISTANT_ID=
NEXT_PUBLIC_VAPI_PUBLIC_API_KEY=
NEXT_PUBLIC_AGENT_NAME=YallaTalk Assistant
```

#### Production Deployment
Environment variables will be configured in Vercel deployment settings:
- `NEXT_PUBLIC_VAPI_ASSISTANT_ID` - Your actual Vapi assistant ID
- `NEXT_PUBLIC_VAPI_PUBLIC_API_KEY` - Your actual Vapi public API key
- `NEXT_PUBLIC_AGENT_NAME` - Name of your AI agent

### 9. Performance Optimizations

#### Next.js Optimizations
- Automatic code splitting via App Router
- Image optimization with `next/image`
- Font optimization with `next/font`
- Static generation where possible

#### Loading Strategy
- Vapi script loads asynchronously via client component
- Fonts preloaded with Next.js font optimization
- Components lazy-loaded where appropriate

#### Animation Performance
- Use `transform` properties for animations
- Implement `will-change` for animated elements
- Minimize layout thrashing

### 10. Development Workflow

#### Getting Started
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

#### File Organization
- Use Next.js App Router conventions
- Components in `/components` directory
- Utilities in `/lib` directory
- Configuration in `/config` directory
- Static assets in `/public` directory

## Success Metrics

- Voice widget integration completeness
- Page load performance (Core Web Vitals)
- User interaction quality
- Mobile responsiveness scores
- Environment variable security compliance
- SEO optimization scores

## Next Steps

1. Initialize Next.js project with TypeScript and Tailwind
2. Set up component structure following Next.js conventions
3. Implement Vapi integration with environment variable placeholders
4. Create responsive design system
5. Deploy to Vercel and configure environment variables
6. Test voice integration with actual Vapi credentials
7. Optimize performance and SEO
8. Monitor production analytics