import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-10 text-center">
      <h1 className="text-4xl font-bold mb-4">
        EagerMinds Bookmark App
      </h1>

      <p className="text-gray-600 mb-8">
        Save, manage and share your bookmarks.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          href="/signup"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Sign Up
        </Link>

        <Link
          href="/login"
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Login
        </Link>
      </div>
    </main>
  );
}