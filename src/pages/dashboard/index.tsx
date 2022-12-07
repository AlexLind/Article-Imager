"use client";
import { NextPage } from "next";
import { useSession, signOut, signIn } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  console.log(sessionData);
  const router = useRouter();

  useEffect(() => {
    if (!sessionData?.user) {
      router.push("/");
      return;
    }
  }, [sessionData, router]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-[5rem]">
            Dashboard
          </h1>
          <div className="flex flex-col items-center gap-2"></div>
        </div>
      </main>
    </>
  );
};

export default Home;
