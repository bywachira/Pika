import Link from "next/link";
import Layout from "../components/Layout";
import LandingNav from "../components/top-nav";

const IndexPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <LandingNav />
      <section>
        <section className="w-full flex justify-center pt-20">
          <div>
            <h1 className="font-copywrite text-5xl text-red-600 text-center max-w-3xl">
              Save time and money with custom-fit images for your marketing
              needs
            </h1>
            <p className="font-inter text-white text-xl py-4 max-w-3xl text-center">
              Make your brand stand out with modern, clear designs.
            </p>
            <div className="flex justify-center">
              <Link href={"/access"} passHref={true}>
                <a
                  className="shadow-sm hover:bg-opacity-90 cursor-pointer text-center py-4 px-16 text-lg text-white rounded bg-red-600 font-inter font-bold"
                  type="button"
                >
                  Try it free today!
                </a>
              </Link>
            </div>
            <div className="flex justify-center font-inter py-2 text-gray-500">
              <p>No credit card required</p>
            </div>
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default IndexPage;
