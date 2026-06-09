"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  is_public: boolean;
};

export default function DashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const fetchBookmarks = async (userId: string) => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setBookmarks(data || []);
  };

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setEmail(user.email || "");
      await fetchBookmarks(user.id);
    };

    checkUser();
  }, [router]);

  const createBookmark = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    if (!title || !url) {
      alert("Title and URL are required");
      return;
    }

    const { error } = await supabase.from("bookmarks").insert({
      user_id: user.id,
      title,
      url,
      is_public: isPublic,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setTitle("");
    setUrl("");
    setIsPublic(false);

    await fetchBookmarks(user.id);

    alert("Bookmark created");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">
            Logged in as: {email}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="border rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">
          Add Bookmark
        </h2>

        <div className="space-y-4">
          <input
            className="border p-2 w-full rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border p-2 w-full rounded"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            Public Bookmark
          </label>

          <button
            onClick={createBookmark}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Bookmark
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">
          My Bookmarks
        </h2>

        {bookmarks.length === 0 ? (
          <p>No bookmarks yet.</p>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="border rounded-lg p-4"
              >
                <h3 className="font-semibold text-lg">
                  {bookmark.title}
                </h3>

                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {bookmark.url}
                </a>

                <p className="mt-2">
                  {bookmark.is_public
                    ? "🌍 Public"
                    : "🔒 Private"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}