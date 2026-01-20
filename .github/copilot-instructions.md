# Copilot Instructions for actaer-page

## Package Manager

This project uses **Bun** as the package manager and runtime for Next.js.

- Use `bun install` instead of `npm install`
- Use `bun add <package>` instead of `npm install <package>`
- Use `bun run dev` instead of `npm run dev`
- Use `bun x` (with a space, NOT `bunx`) instead of `npx` for running CLI tools

## Tech Stack

- **Framework**: Next.js 16+ with App Router
- **Styling**: Tailwind CSS 4.x
- **UI Components**: shadcn/ui with Radix primitives
- **Animations**: GSAP with @gsap/react
- **Forms**: react-hook-form + zod + Formspree
- **Blog**: MDX with @next/mdx
- **Language**: TypeScript

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - React components (ui/, layout/, sections/, forms/, blog/)
- `content/` - MDX blog content
- `lib/` - Utility functions and configurations
- `public/` - Static assets including images

## Conventions

- Use `"use client"` directive for components with GSAP animations or form state
- Prefer Server Components where possible
- Use shadcn components from `@/components/ui`
- Follow the existing Tailwind CSS class patterns
