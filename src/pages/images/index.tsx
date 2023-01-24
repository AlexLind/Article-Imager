/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Navbar from "../../components/shared/Navbar";
import { api } from "../../utils/api";

const YourImages: NextPage = () => {
  const { data: sessionData } = useSession();
  const data = api.db.getImages.useQuery(sessionData?.user?.id);
  console.log(data);

  return (
    <>
      <Navbar />
      <main>
        <div className="h-[calc(100% - h-16)] mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col items-center justify-center gap-10">
              {!data.isLoading ? (
                <>
                  <h1 className="text-3xl font-bold">Saved Images:</h1>
                  <br />
                  <div className="row-auto-flex justify-center gap-3">
                    {data.data.images.map((image, index) => {
                      return (
                        <div key={index} className="">
                          <h3 className="gap-3 text-2xl font-semibold">
                            {image.title}
                          </h3>
                          <img src={image.image} alt={image.title} />
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <h1 className="text-3xl font-bold"> Loading Images... </h1>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default YourImages;
