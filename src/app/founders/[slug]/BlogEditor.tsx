"use client";

import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  body: string;
  createdAt: number;
}

function storageKey(slug: string) {
  return `healthapp:blog:${slug}`;
}

export default function BlogEditor({ slug, name }: { slug: string; name: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(storageKey(slug));
    if (raw) setPosts(JSON.parse(raw));
  }, [slug]);

  function save(next: Post[]) {
    setPosts(next);
    localStorage.setItem(storageKey(slug), JSON.stringify(next));
  }

  function handlePublish() {
    if (!title.trim() || !body.trim()) return;
    const newPost: Post = {
      id: crypto.randomUUID(),
      title: title.trim(),
      body: body.trim(),
      createdAt: Date.now(),
    };
    save([newPost, ...posts]);
    setTitle("");
    setBody("");
  }

  function handleDelete(id: string) {
    save(posts.filter((p) => p.id !== id));
  }

  return (
    <div className="w-full max-w-2xl flex flex-col gap-8">
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5 flex flex-col gap-3">
        <h2 className="text-lg font-medium text-stone-800">Write a blog post as {name}</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your post..."
          rows={5}
          className="border border-stone-300 rounded-lg px-3 py-2 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
        <button
          onClick={handlePublish}
          className="self-start bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Publish
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-medium text-stone-800">Posts</h2>
        {posts.length === 0 && (
          <p className="text-stone-500 text-sm">No posts yet.</p>
        )}
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-xl shadow-sm border border-stone-200 p-5 flex flex-col gap-2"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-medium text-stone-800">{post.title}</h3>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-stone-400 hover:text-rose-600 text-xs"
              >
                Delete
              </button>
            </div>
            <p className="text-xs text-stone-400">
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <p className="text-stone-600 text-sm whitespace-pre-wrap">{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
