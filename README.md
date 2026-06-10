# EagerMinds Bookmark App

## Live URL

[Add Vercel URL]

## GitHub Repository

[Add GitHub URL]

## Tech Stack

* Next.js 16
* TypeScript
* Supabase Authentication
* Supabase Database
* Tailwind CSS
* Entire CLI

## Features

* User Signup/Login
* Protected Dashboard
* Create Bookmarks
* View Bookmarks
* Delete Bookmarks
* Public/Private Bookmark Visibility
* Public Profile via Unique Handle
* Row Level Security (RLS)

## Local Setup

1. Clone the repository
2. Install dependencies

npm install

3. Create .env.local

NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...

4. Start development server

npm run dev

## AI Agent Issue I Fixed

During development, bookmark creation initially failed because Supabase Row Level Security policies were missing. After investigating the permission denied errors, I added user-specific policies using auth.uid() and verified that users could only access their own bookmarks.

## Future Improvement

With more time, I would add bookmark editing, better UI/UX, bookmark metadata previews, and automated profile creation after signup.
