import React from "react";
import chef2doorlandingpage from "../assets/chef2doorlandingpage.png";
const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen mt-40 ">
      <img
        src={chef2doorlandingpage}
        alt=""
        className="w-auto mt-2 h-[40vh] mb-3"
      />
      <h1 className="text-[#282c3f] font-extrabold text-2xl tracking-tighter leading-7">
        We're Cooking Something Delicious!
      </h1>
      <p className="text-base pt-3 text-[#60606e] tracking-tighter leading-5">
        Our website is currently under construction. Come back soon to
        experience the taste of perfection.
      </p>
      <div className="flex items-center justify-center p-4">
        <a
          href="/"
          className="px-5 py-3 bg-[#f3730a] text-white font-medium mb-4 shadow-sm hover:shadow-md"
        >
          Go Back to Homepage
        </a>
      </div>
    </div>
  );
};

export default SignIn;
