import React from "react";
import LandingNav from "../components/top-nav";

export default function Access(): React.ReactElement {
  return (
    <section>
      <LandingNav />
      <section className="flex h-full place-items-center flex-wrap-reverse">
        <aside className="md:w-1/2 sm:w-full">
          <section>
            <img src="/sally.png" alt="Login" />
          </section>
        </aside>
        <main className="md:w-1/2 sm:w-full flex justify-center px-4 py-4">
          <section>
            <h2 className="font-copywrite text-3xl text-center max-w-2xl">
              Your journey starts here
            </h2>
            <section className="w-full">
              <button
                type="button"
                className="inline-flex justify-center text-red-600 w-full text-bold px-4 py-2 my-2 text-sm font-medium leading-5 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-red-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue"
              >
                <svg viewBox="0 0 533.5 544.3" width="20" height="20">
                  <path
                    fill="currentColor"
                    className="google_svg__st0"
                    d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                  ></path>
                  <path
                    fill="currentColor"
                    className="google_svg__st1"
                    d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                  ></path>
                  <path
                    fill="currentColor"
                    className="google_svg__st2"
                    d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                  ></path>
                  <path
                    fill="currentColor"
                    className="google_svg__st3"
                    d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                  ></path>
                </svg>
                <div className="flex-1 font-inter text-red-600 hover:text-red-400 font-bold">
                  Sign in with Google
                </div>
                {/* <div className="w-5 font-inter"></div> */}
              </button>
              <button
                type="button"
                className="inline-flex my-2 text-red-600 justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-red-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  width="20"
                  height="20"
                >
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
                <div className="flex-1 font-inter font-bold">
                  Sign in with Twitter
                </div>
                {/* <div className="w-5"></div> */}
              </button>
              <button
                type="button"
                className="inline-flex my-2 text-red-600 justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-red-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  width="20"
                  height="20"
                >
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
                <div className="flex-1 font-inter font-bold">
                  Sign in with Github
                </div>
                {/* <div className="w-5"></div> */}
              </button>
            </section>
          </section>
        </main>
      </section>
    </section>
  );
}
