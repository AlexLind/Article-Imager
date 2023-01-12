"use client";
import { NextPage } from "next";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";


const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  console.log(sessionData);
  const router = useRouter();

  useEffect(() => {
    if (!sessionData) {
      void router.push("/");
      return;
    }
  }, [sessionData, router]);

  return (
    <>
      <header className="bg-white shadow grid grid-flow-col auto-cols-max place-content-between h-30">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
        <img className="rounded-full h-12 m-3" src={sessionData?.user?.image} alt="profile photo" />
        <button
          className="rounded-full bg-black/10 px-10 py-3 m-4 font-semibold text-black no-underline transition hover:bg-black/20"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="h-96 rounded-lg border-4 border-dashed border-gray-200">
              Hello
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
