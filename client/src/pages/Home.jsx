import React from "react";
import bannerImg from "../assets/bannerimg.png";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <section className="text-gray-600 font-poppins">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="font-poppins sm:text-6xl text-3xl mb-4 font-medium text-gray-900">
              Stay you <br className="hidden lg:inline-block" />
              Stay comfortable <br className="hidden lg:inline-block" />
              Stay with us.
            </h1>
            <p className="mb-8 text-2xl leading-relaxed">
              Enjoy a new, refreshing vibe with our PG
            </p>
            <div className="flex justify-center">
              <Link className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Get Started
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={bannerImg}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
