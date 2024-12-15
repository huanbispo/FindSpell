import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "./auth/AuthModal";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Spells", href: "/spells" },
  { name: "Classes", href: "/classes" },
  { name: "About", href: "/about" },
];

export const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const isCurrentPath = (path: string) => {
    if (path === "/" && location.pathname !== "/") {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <Disclosure as="nav" className="bg-white shadow-sm sticky top-0 z-10">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <Link to="/" className="flex flex-shrink-0 items-center">
                    <span className="text-2xl font-bold text-primary-600">
                      Find Spell
                    </span>
                  </Link>
                  <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                          isCurrentPath(item.href)
                            ? "border-primary-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                  {user ? (
                    <>
                      <Link
                        to="/spells/new"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                      >
                        <PlusIcon className="h-4 w-4" />
                        Add New Spell
                      </Link>

                      <Menu as="div" className="relative ml-3">
                        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                          <div className="relative h-8 w-8 rounded-full overflow-hidden ring-2 ring-white">
                            <img
                              className="h-full w-full object-cover"
                              src={
                                user.photoURL ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  user.displayName || "User"
                                )}&background=random`
                              }
                              alt={user.displayName || "User"}
                            />
                          </div>
                        </Menu.Button>
                        <Transition
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-4 py-2 border-b border-gray-100">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {user.displayName}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {user.email}
                              </p>
                            </div>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={handleSignOut}
                                  className={`${
                                    active ? "bg-gray-50" : ""
                                  } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                                >
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsAuthModalOpen(true)}
                      className="rounded-lg bg-primary-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                    >
                      Sign In
                    </button>
                  )}
                </div>

                <div className="-mr-2 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={`block py-2 pl-3 pr-4 text-base font-medium ${
                      isCurrentPath(item.href)
                        ? "border-l-4 border-primary-500 bg-primary-50 text-primary-700"
                        : "border-l-4 border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                    }`}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-200 pb-3 pt-4">
                {user ? (
                  <div className="space-y-1">
                    <div className="flex items-center px-4">
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={
                            user.photoURL ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user.displayName || "User"
                            )}&background=random`
                          }
                          alt={user.displayName || "User"}
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {user.displayName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <Disclosure.Button
                      as={Link}
                      to="/spells/new"
                      className="block px-4 py-2 text-base font-medium text-primary-600 hover:bg-gray-100"
                    >
                      Add New Spell
                    </Disclosure.Button>
                    <button
                      onClick={handleSignOut}
                      className="block w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div className="px-4">
                    <button
                      onClick={() => setIsAuthModalOpen(true)}
                      className="w-full rounded-lg bg-primary-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};
