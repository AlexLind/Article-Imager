import SubmitForm from "./../../components/SubmitForm";
("use client");
import type { NextPage } from "next";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import Navbar from "../../components/shared/Navbar";
import { api } from "../../utils/api";
// import Image from 'next/image'

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [url, setUrl] = useState("");
  const [article, setArticle] = useState({});
  const resolvedArticle = api.articleExtractor.getArticle.useQuery({
    text: url,
  });

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

  console.log(resolvedArticle);

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
            <div>
              {resolvedArticle.data && ( // if data is available
                <div className="flex flex-col items-center justify-center gap-4">
                  <h1 className="text-2xl font-bold">
                    {resolvedArticle.data.article.title}
                  </h1>
                  <p className="text-lg">
                    {resolvedArticle.data.article.content}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
