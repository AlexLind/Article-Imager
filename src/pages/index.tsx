/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import GitHubButton from "react-github-btn";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  const router = useRouter();

  if (sessionData) {
    void router.push("/dashboard");
    return <></>;
  }

  return (
    <>
      <Head>
        <title>Article Imager</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link
          rel="icon"
          href="https://img.icons8.com/stickers/100/null/share-moment.png"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-100">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16 ">
          <span className="text-3xl font-bold">Welcome to</span>
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-[5rem]">
            <span className="text-black">Article</span>{" "}
            <span className="text-teal-400">
              Imager
              <img
                alt="Article Imager Logo"
                className="ml-2 inline-block h-20 w-20"
                src="data:image/png;base64,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"
              ></img>
            </span>
            <p className="font-mono text-xl text-black">
              {" "}
              The first <span className="text-teal-400">
                {" "}
                copyright free{" "}
              </span>{" "}
              automated image generator for online articles{" "}
            </p>
          </h1>
          <h2 className="text-xl font-semibold">Powered by:</h2>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/320px-OpenAI_Logo.svg.png"
            alt="Open AI Logo"
            width="150px"
          />
          <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <div className="flex flex-row items-center justify-center gap-4">
        <button
          className="transform rounded-full bg-black px-10 py-3 font-semibold text-white no-underline transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-800 hover:shadow-lg"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
        <button
          className="transform rounded-full bg-black px-10 py-3 font-semibold text-white no-underline transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-800 hover:shadow-lg"
          onClick={() => void router.push("/dashboard")}
        >
          Demo
        </button>
      </div>
      <div className="translate-y-12">
        <GitHubButton
          href="https://github.com/AlexLind"
          data-color-scheme="no-preference: dark; light: dark; dark: dark;"
          aria-label="Follow @AlexLind on GitHub"
        >
          Follow @AlexLind
        </GitHubButton>
      </div>
    </div>
  );
};
