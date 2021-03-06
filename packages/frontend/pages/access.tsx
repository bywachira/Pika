import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { firebase } from "../firebase";
import LandingNav from "../components/top-nav";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
});

export default function Access(): React.ReactElement {
  const router = useRouter();

  function authenticate(payload: {
    email: string | null | undefined;
    uid: string | null | undefined;
    avatar: string | null | undefined;
    name: string | null | undefined;
  }) {
    return client.post(`/authenticate`, payload);
  }

  function firebaseAuth(provider: any) {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (res) => {
        const user = res.user;
        const token: any = await res.user?.getIdToken(true);

        authenticate({
          email: user?.email,
          uid: user?.uid,
          avatar: user?.photoURL,
          name: user?.displayName,
        })
          .then(() => {
            localStorage.setItem("app-token", token);
            router.push("/dashboard");
          })
          .catch((err) => {
            toast.error(err.message);
          });
      });
  }

  function googleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebaseAuth(provider);
  }

  function twitterAuth() {
    const provider = new firebase.auth.TwitterAuthProvider();

    firebaseAuth(provider);
  }

  function githubAuth() {
    const provider = new firebase.auth.GithubAuthProvider();

    firebaseAuth(provider);
  }

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
            <h2 className="font-copywrite text-3xl text-white text-center max-w-2xl">
              Your journey starts here
            </h2>
            <section className="w-full">
              <button
                type="button"
                onClick={() => googleAuth()}
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
                onClick={() => twitterAuth()}
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
                onClick={() => githubAuth()}
                className="inline-flex my-2 text-red-600 justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-red-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue"
              >
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  width="20"
                  height="20"
                >
                  <g>
                    <g>
                      <path
                        d="M255.968,5.329C114.624,5.329,0,120.401,0,262.353c0,113.536,73.344,209.856,175.104,243.872
			c12.8,2.368,17.472-5.568,17.472-12.384c0-6.112-0.224-22.272-0.352-43.712c-71.2,15.52-86.24-34.464-86.24-34.464
			c-11.616-29.696-28.416-37.6-28.416-37.6c-23.264-15.936,1.728-15.616,1.728-15.616c25.696,1.824,39.2,26.496,39.2,26.496
			c22.848,39.264,59.936,27.936,74.528,21.344c2.304-16.608,8.928-27.936,16.256-34.368
			c-56.832-6.496-116.608-28.544-116.608-127.008c0-28.064,9.984-51.008,26.368-68.992c-2.656-6.496-11.424-32.64,2.496-68
			c0,0,21.504-6.912,70.4,26.336c20.416-5.696,42.304-8.544,64.096-8.64c21.728,0.128,43.648,2.944,64.096,8.672
			c48.864-33.248,70.336-26.336,70.336-26.336c13.952,35.392,5.184,61.504,2.56,68c16.416,17.984,26.304,40.928,26.304,68.992
			c0,98.72-59.84,120.448-116.864,126.816c9.184,7.936,17.376,23.616,17.376,47.584c0,34.368-0.32,62.08-0.32,70.496
			c0,6.88,4.608,14.88,17.6,12.352C438.72,472.145,512,375.857,512,262.353C512,120.401,397.376,5.329,255.968,5.329z"
                      />
                    </g>
                  </g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
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
