import React from "react";

const Register = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src="/logo-no-background.png" alt="" className="h-16 mb-1 " />
      <form className="flex flex-col drop-shadow-md p-4">
        <label className="text-center text-3xl mb-8 text-gray-600">
          Sign up
        </label>

        <input
          type="text"
          placeholder="First Name"
          className=" border border-gray-400 p-2 w-72 outline-none mb-5 text-gray-500"
        />
        <input
          type="text"
          placeholder="Last Name"
          className=" border border-gray-400 p-2 w-72 outline-none mb-5 text-gray-500"
        />
        <input
          type="text"
          placeholder="Username"
          className=" border border-gray-400 p-2 w-72 outline-none mb-5 text-gray-500"
        />
        <input
          type="text"
          placeholder="Email"
          className=" border border-gray-400 p-2 w-72 outline-none mb-5 text-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          className=" border border-gray-400 p-2 w-72 outline-none mb-5 text-gray-500"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className=" border border-gray-400 p-2 w-72 outline-none mb-5 text-gray-500"
        />
        <button className=" bg-blue-500 w-2/3 mx-auto p-2 text-white hover:bg-blue-600 mt-6 ">
          Sign Up
        </button>
        <span className="text-center mt-8">
          Already have an account?{" "}
          <span className=" text-blue-500 hover:cursor-pointer">Sign In.</span>
        </span>
      </form>
    </div>
  );
};

export default Register;
