"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { EditorRenderer } from "@/components/EditorRenderer";
import type { EditorContent } from "@/types/editor";

type ArticleDetail = {
  id: string;
  title: string;
  content: string;
  image: string;
};

export default function ArticleDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [articleRes] = await Promise.all([
          fetch(`/api/article/${id}`),
        ]);

        const articleData = await articleRes.json();
        setArticle(articleData);
      } catch (err) {
        console.error("Failed to load subject detail:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadAllData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  let editorBlocks: EditorContent["blocks"] = [];

  if (article?.content) {
    try {
      const parsed: EditorContent = typeof article.content === "string"
        ? JSON.parse(article.content)
        : article.content;
      editorBlocks = parsed?.blocks || [];
    } catch (error) {
      console.error("Failed to parse subject content:", error);
    }
  }

  return (
    <div className={`transition-opacity duration-500 md:mx-16 ${loading ? "opacity-0" : "opacity-100"}`}>
      <div className="max-w-8xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{article?.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {article?.image && (
              <img src={article.image} alt={article.title} className="w-full mb-4" />
            )}
            <EditorRenderer blocks={editorBlocks} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
