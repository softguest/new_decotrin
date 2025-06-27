'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { OutputData } from '@editorjs/editorjs';

// Lazy load the Editor to ensure SSR safety
const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });

export default function CreateArticle() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<OutputData>({ blocks: [] });
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', JSON.stringify(content));
    if (file) {
      formData.append('file', file);
    }

    const res = await fetch('/api/article', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      window.location.href = '/dashboard/';
    } else {
      console.error('Failed to submit subject');
    }
  }

  return (
    <div className="mx-4 max-w-4xl my-4">
      <h1 className="md:text-2xl font-bold mb-4">Create New Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Editor
          data={null}
          onChange={(data) => setContent(data)}
          // editorBlock="editorjs"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          type="submit"
          className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Publish Article
        </button>
      </form>
    </div>
  );
}
