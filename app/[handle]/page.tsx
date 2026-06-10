import { supabase } from "@/lib/supabase";

export default async function PublicProfile({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  console.log("HANDLE:", handle);

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("handle", handle)
    .single();

  console.log(profile, error);

  if (!profile) {
    return <div>User not found</div>;
  }

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", profile.id)
    .eq("is_public", true);

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        @{handle}
      </h1>

      {bookmarks?.map((bookmark) => (
        <div
          key={bookmark.id}
          className="border rounded p-4 mb-3"
        >
          <h2>{bookmark.title}</h2>

          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {bookmark.url}
          </a>
        </div>
      ))}
    </div>
  );
}