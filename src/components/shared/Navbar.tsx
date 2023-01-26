/* eslint-disable @next/next/no-img-element */
import type { FC } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { HiBookOpen, HiX } from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NavbarProps {}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar: FC<NavbarProps> = ({}) => {
  const { data: sessionData } = useSession();

  return (
    <Disclosure as="nav" className="h-16 bg-neutral-300">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <HiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <HiBookOpen className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    {/* <img
                      className="block h-14 w-auto lg:hidden"
                      src="https://svgshare.com/i/pe5.svg"
                      alt="Your Company"
                    /> */}
                    <img
                      alt="Article Imager Logo"
                      className="block h-14 w-auto lg:hidden"
                      src="data:image/png;base64,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"
                    ></img>
                    <img
                      className="hidden h-14 w-auto lg:block"
                      src="data:image/png;base64,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"
                      alt="Your Company"
                    />
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {sessionData && (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-11 w-11 rounded-full"
                          src={sessionData.user.image}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/images"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Images
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block w-full px-4 py-2 text-left text-sm text-gray-700"
                              )}
                              onClick={() => void signOut()}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
