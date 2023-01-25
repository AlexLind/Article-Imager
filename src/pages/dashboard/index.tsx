/* eslint-disable @next/next/no-img-element */
import SubmitForm from "./../../components/SubmitForm";
("use client");
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import Navbar from "../../components/shared/Navbar";
import { api } from "../../utils/api";
import type { ArticleData } from "@extractus/article-extractor";
import { RotatingLines } from "react-loader-spinner";
let imageUrlChanged = false;

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
    if (inputValue != url) {
      setUrl(inputValue);
      imageUrlChanged = false;
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="h-[calc(100% - h-16)] mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-center">
              {url.length === 0 ? (
                <SubmitForm
                  handleSubmit={handleSubmit}
                  setInputValue={setInputValue}
                />
              ) : null}
            </div>
            {url && url.length > 0 && <Article url={url} setUrl={setUrl} />}
          </div>
        </div>
      </main>
    </>
  );
};

interface ArticleProps {
  url: string;
  setUrl?: (url: string) => void;
}
interface ImagePrompt {
  article: string;
  articleUrl: string;
  setUrl?: (url: string) => void;
  title: string;
}
interface Image {
  prompt: string;
  articleUrl: string;
  setUrl?: (url: string) => void;
  title: string;
}

const getArticle = (url: string) => {
  const resolvedArticle = api.articleExtractor.getArticle.useQuery(url);
  return resolvedArticle;
};

const getPrompt = (article: string) => {
  if (!article) throw new Error("Article is undefined");

  const imagePrompt =
    api.articleExtractor.getImagePromptFromArticle.useQuery(article);
  return imagePrompt;
};

const getImage = (prompt: string) => {
  const image = api.articleExtractor.getImageFromPrompt.useQuery(prompt);
  return image;
};

const Article: React.FC<ArticleProps> = ({ url, setUrl }: ArticleProps) => {
  const [article, setArticle] = useState<ArticleData>({});
  const [isLoading, setIsLoading] = useState(true);
  const resolvedArticle = getArticle(url);
  if (isLoading !== resolvedArticle.isLoading) {
    setIsLoading(resolvedArticle.isLoading);
  }

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
  }, [isLoading, resolvedArticle]);

  return (
    <div>
      {article && (
        <>
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-3xl font-bold">{article.title}</h1>
            <h3 className="text-l font-semibold italic">{article.url}</h3>
            <br />
          </div>
          {article.content && (
            <Prompt
              article={article.content}
              articleUrl={article.url}
              setUrl={setUrl}
              title={article.title}
            />
          )}
        </>
      )}
    </div>
  );
};

const Prompt: React.FC<ImagePrompt> = ({
  article,
  articleUrl,
  title,
  setUrl,
}: ImagePrompt) => {
  const [prompt, setPrompt] = useState("");
  const resolvedPrompt = getPrompt(article);
  const [isLoading, setIsLoading] = useState(true);
  if (isLoading !== resolvedPrompt.isLoading) {
    setIsLoading(resolvedPrompt.isLoading);
  }

  useEffect(() => {
    if (resolvedPrompt === null) {
      return;
    }

    if (
      !resolvedPrompt.isLoading &&
      resolvedPrompt.data &&
      resolvedPrompt.data.imagePrompt
    ) {
      setPrompt(resolvedPrompt.data.imagePrompt);
    }
  }, [isLoading, resolvedPrompt]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {prompt ? (
        <GeneratedImage
          prompt={prompt}
          setUrl={setUrl}
          title={title}
          articleUrl={articleUrl}
        />
      ) : (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="72"
          visible={true}
        />
      )}
    </div>
  );
};

const GeneratedImage: React.FC<Image> = ({
  prompt,
  title,
  articleUrl,
  setUrl,
}: Image) => {
  const { data: sessionData } = useSession();
  const [imageUrl, setImageUrl] = useState("");
  const resolvedImage = getImage(prompt);
  const [isLoading, setIsLoading] = useState(true);
  const mutateImage = api.db.saveImage.useMutation().mutate;
  if (isLoading !== resolvedImage.isLoading) {
    setIsLoading(resolvedImage.isLoading);
  }

  useEffect(() => {
    if (resolvedImage === null) {
      return;
    }

    if (
      !resolvedImage.isLoading &&
      resolvedImage.data &&
      resolvedImage.data.image
    ) {
      if (imageUrlChanged) return;
      setImageUrl(resolvedImage.data.image);
      imageUrlChanged = true;
    }
  }, [isLoading, resolvedImage, imageUrl]);

  const saveImage = () => {
    try {
      mutateImage({ imageUrl, articleUrl, title, sessionData });
      setUrl("");
    } catch (error) {
      console.log("error saving image: ", error);
    }
  };

  return (
    <div>
      {resolvedImage && ( // if data is available
        <>
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Generated Image:</h1>
            {imageUrl ? (
              <>
                <img src={imageUrl} alt="Generated Image" />
                <div>
                  <button
                    onClick={() => void saveImage()}
                    className="
                  mx-2
                  rounded
                  bg-blue-600
                  px-6
                  py-2.5
                  text-xs
                  font-medium
                  uppercase
                  leading-tight
                  text-white
                  shadow-md
                  transition duration-150
                  ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                  focus:shadow-lg focus:outline-none
                  focus:ring-0
                  active:bg-blue-800
                  active:shadow-lg"
                  >
                    Save Image
                  </button>
                  <button
                    onClick={() => setUrl("")}
                    className="
                  mx-2
                  rounded
                  bg-blue-600
                  px-6
                  py-2.5
                  text-xs
                  font-medium
                  uppercase
                  leading-tight
                  text-white
                  shadow-md
                  transition duration-150
                  ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                  focus:shadow-lg focus:outline-none
                  focus:ring-0
                  active:bg-blue-800
                  active:shadow-lg"
                  >
                    Reset Image
                  </button>
                </div>
              </>
            ) : (
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="48"
                visible={true}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
