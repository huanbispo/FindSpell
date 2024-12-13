import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingSpinner } from "../ui/LoadingSpinner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { signInWithGoogle, signInWithApple } = useAuth();
  const [loading, setLoading] = useState<"google" | "apple" | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setLoading("google");
      await signInWithGoogle();
      onClose();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    } finally {
      setLoading(null);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setLoading("apple");
      await signInWithApple();
      onClose();
    } catch (error) {
      console.error("Error signing in with Apple:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col items-center">
                  {/* Logo */}
                  <div className="mb-6">
                    <h1 className="text-4xl font-bold text-primary-600">
                      Find Spell
                    </h1>
                  </div>

                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold text-gray-900 mb-2"
                  >
                    Create Account
                  </Dialog.Title>

                  <p className="text-sm text-gray-500 mb-8">
                    Join the D&D community to create and share your spells
                  </p>

                  {/* Sign in buttons */}
                  <div className="w-full space-y-4">
                    <button
                      onClick={handleGoogleSignIn}
                      disabled={loading !== null}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative"
                    >
                      {loading === "google" ? (
                        <LoadingSpinner className="h-5 w-5 text-primary-600" />
                      ) : (
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                          />
                        </svg>
                      )}
                      <span className="flex-1">Sign up with Google</span>
                    </button>

                    <button
                      onClick={handleAppleSignIn}
                      disabled={loading !== null}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative"
                    >
                      {loading === "apple" ? (
                        <LoadingSpinner className="h-5 w-5 text-white" />
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                        </svg>
                      )}
                      <span className="flex-1">Sign up with Apple</span>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative w-full my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Already have an account?
                      </span>
                    </div>
                  </div>

                  {/* Sign in link */}
                  <button
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                    onClick={onClose}
                  >
                    Sign In
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
