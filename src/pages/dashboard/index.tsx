import SubmitForm from "./../../components/SubmitForm";
("use client");
import type { NextPage } from "next";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import Navbar from "../../components/shared/Navbar";
import { api } from "../../utils/api";
import type { ArticleData } from "@extractus/article-extractor";
// import Image from 'next/image'

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!sessionData) {
      void router.push("/");
      return;
    }
  }, [sessionData, router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUrl(inputValue);
    console.log(url);
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="h-[calc(100% - h-16)] mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-center">
              <SubmitForm
                handleSubmit={handleSubmit}
                setInputValue={setInputValue}
              />
            </div>
            <div>
              {url.length > 0 && (
                <h1 className="my-4 flex justify-center">URL Accepted</h1>
              )}
            </div>
            <Article url={url} />
          </div>
        </div>
      </main>
    </>
  );
};

interface ArticleProps {
  url: string;
}
interface ImagePrompt {
  article: string;
}

const getArticle = (url: string) => {
  const resolvedArticle = api.articleExtractor.getArticle.useQuery(url);
  return resolvedArticle;
};

const getPrompt = (article: string) => {
  const imagePrompt =
    api.articleExtractor.getImagePromptFromArticle.useQuery(article);
  return imagePrompt;
};

const Article: React.FC<ArticleProps> = ({ url }: ArticleProps) => {
  const [article, setArticle] = useState<ArticleData>({});
  const resolvedArticle = getArticle(url);

  useEffect(() => {
    if (resolvedArticle === null) {
      return;
    }

    if (
      !resolvedArticle.isLoading &&
      resolvedArticle.data &&
      resolvedArticle.data.article
    ) {
      setArticle(resolvedArticle.data.article);
    }
  }, [resolvedArticle]);

  return (
    <div>
      {article && ( // if data is available
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">{article.title}</h1>
          <p className="text-lg">{article.content}</p>
        </div>
      )}
      <Prompt article={article.content} />
    </div>
  );
};

const Prompt: React.FC<ImagePrompt> = ({ article }: ImagePrompt) => {
  console.log(article);
  const [prompt, setPrompt] = useState("test");
  if (!article) {
    return null;
  }
  // const resolvedPrompt = getPrompt(article);
  // console.log(resolvedPrompt);

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">{prompt}</h1>
      </div>
    </div>
  );
};

export default Home;
