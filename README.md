# EagerMinds Bookmark App

## Live URL

https://eagerminds-task-one.vercel.app

Example Public Profile:

https://eagerminds-task-one.vercel.app/vaishnao

## GitHub Repository

https://github.com/VaishnaoVaidya/eagerminds-task

## Tech Stack

* Next.js 16
* TypeScript
* Supabase Authentication
* Supabase Database
* Tailwind CSS
* Entire CLI
* Vercel

## Features

* User Signup and Login
* Protected Dashboard
* Create Bookmarks
* View Bookmarks
* Edit Bookmarks
* Delete Bookmarks
* Public / Private Bookmark Visibility
* Public Profile via Unique Handle
* Row Level Security (RLS)
* User-specific Data Access Control
* Deployed on Vercel

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/VaishnaoVaidya/eagerminds-task.git
cd eagerminds-task
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

### 4. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Security

The application uses Supabase Row Level Security (RLS) policies to ensure:

* Users can only view their own bookmarks.
* Users can only edit their own bookmarks.
* Users can only delete their own bookmarks.
* Public visitors can only view bookmarks marked as public.
* User data is protected even if APIs are accessed directly.

## AI Agent Issue I Fixed

During development, the AI-generated implementation for bookmark operations did not include the required Supabase Row Level Security policies. This caused permission errors when creating and accessing bookmarks.

I investigated the database logs, identified the missing policies, and implemented user-specific RLS rules using `auth.uid()` to ensure users could only access their own data.

I also debugged issues with the public profile route, where anonymous users could not access profile information due to missing permissions on the `profiles` table.

## Future Improvements

With more time, I would:

* Improve the UI/UX design and responsiveness.
* Add bookmark previews and metadata fetching.
* Add search and filtering for bookmarks.
* Automate profile creation using Supabase Auth triggers.
* Integrate Resend for custom welcome emails.
* Add bookmark categories and tags.

## Project Status

Completed as part of the EagerMinds Software Developer Take-Home Task.
