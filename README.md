# 🍳 Kitchen Hub - Old Beams Restaurant & Bar

A comprehensive Kitchen Management System designed as a Progressive Web App (PWA).

## Features
- **Role-Based Access Control**: Secure logins for Managers, Chefs, Waiters, and Kitchen Assistants.
- **Multi-Language Support**: Full translations in English, Tamil, French, Hindi, and Arabic (RTL support built-in).
- **Daily Reports**: Custom report forms for each role, with image upload capabilities.
- **Inventory Management**: Track and update over 80+ inventory items with stock par-levels.
- **Meeting Scheduler**: Integrated meeting calendar and agenda publisher for managers.
- **Staff Instructions**: Real-time broadcasts and instructions to different kitchen roles.
- **PWA Ready**: Installable on iOS and Android devices just like a native app.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Custom Design System with CSS Variables and Tailwind utilities
- **Database & Auth**: Supabase (PostgreSQL, Row Level Security, Storage)
- **PWA**: Serwist Next.js integration

## Local Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Rename `.env.local.example` to `.env.local` and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Supabase Database Setup**
   Run the following SQL files in your Supabase SQL Editor in this order:
   - `supabase/schema.sql` (Creates tables, enums, functions, and RLS policies)
   - `supabase/seed.sql` (Populates the 80+ inventory items)
   - `supabase/storage.sql` (Configures the `report-images` bucket)

4. **Run the Server**
   ```bash
   npm run dev
   ```

## Creating Users
Users should be created through the Supabase Authentication dashboard initially. Once a user logs in for the first time, a database trigger automatically inserts them into the `profiles` and `user_roles` tables. You can then update their specific role in the `user_roles` table via the Supabase dashboard to elevate them to Manager, Chef, etc.

## Deployment to Vercel

1. Push this repository to GitHub.
2. Go to Vercel and import the repository.
3. In the Environment Variables section, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click Deploy. Vercel will automatically detect Next.js and configure the build settings.

## Using as a Mobile App (PWA)
1. Open the deployed Vercel URL on a mobile device (Safari for iOS, Chrome for Android).
2. Tap "Share" -> "Add to Home Screen" (iOS) or tap the Install prompt (Android).
3. The app will now launch in fullscreen native mode with its own icon.
