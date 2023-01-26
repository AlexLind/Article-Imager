/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Navbar from "../../components/shared/Navbar";
import { api } from "../../utils/api";

const YourImages: NextPage = () => {
  const { data: sessionData } = useSession();
  const [refreshCount, setRefreshCount] = useState(0);
  const data = api.db.getImages.useQuery(sessionData?.user?.id);
  const router = useRouter();
  const utils = api.useContext();
  const deleteImage = api.db.deleteImage.useMutation({
    onSuccess() {
      void utils.db.getImages.invalidate();
    },
  }).mutate;
  // const queryClient = useQueryClient();

  useEffect(() => {
    if (!sessionData) {
      void router.push("/");
      return;
    }
  }, [sessionData, router]);

  const handleDelete = (id: string) => {
    console.log("Deleting image with id: " + id);
    try {
      deleteImage({ id: id });
      setRefreshCount(refreshCount + 1);
      // RERENDER PAGE HERE
    } catch (error) {
      console.log("error deleting image: ", error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-neutral-100">
        <input type="hidden" value={refreshCount}></input>
        <div className="h-[calc(100% - h-16)] mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col items-center justify-center gap-10">
              {!data.isLoading ? (
                <>
                  <h1 className="text-3xl font-bold">
                    Saved <span className="text-teal-400">Images</span>:
                  </h1>
                  <br />
                  <div className="grid grid-cols-3 justify-center gap-1">
                    {data.data.images.map((image, index) => {
                      return (
                        <div
                          key={index}
                          className="m-4 flex max-w-sm flex-col rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
                        >
                          <a href="#">
                            <img
                              className="rounded-t-lg"
                              src={image.image}
                              alt={image.title}
                            />
                          </a>
                          <div className="flex flex-1 flex-col p-5">
                            <a href="#">
                              <h5 className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-white">
                                {image.title}
                              </h5>
                            </a>
                            {/* <div> Image title </div> */}
                            <div className="flex-1"></div>
                            {/* <div> Image description </div> */}
                            <p className="mb-3 text-center font-semibold text-black dark:text-gray-400">
                              Article found at URL:
                              <br />
                              <a
                                href={image.articleUrl}
                                target="_blank"
                                className="font-medium text-teal-400 hover:underline dark:text-blue-500"
                                rel="noreferrer"
                              >
                                {image.articleUrl}
                              </a>
                            </p>
                            <div className="bottom-0 space-x-10">
                              <a
                                href="#"
                                className="mx-3 inline-flex rounded-lg border bg-white px-3 py-2 text-center text-sm font-medium text-black hover:bg-gray-100 focus:outline-none focus:ring-4 dark:bg-gray-700 dark:hover:bg-gray-600"
                                onClick={() => void handleDelete(image.id)}
                              >
                                Delete Image
                              </a>
                              <a
                                href={image.image}
                                target="_blank"
                                className="mx-3  rounded-lg border bg-white px-3 py-2 text-center text-sm font-medium text-black hover:bg-gray-100 focus:outline-none focus:ring-4 dark:bg-gray-700 dark:hover:bg-gray-600"
                                rel="noreferrer"
                              >
                                Open In New Tab
                              </a>
                            </div>
                          </div>
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
