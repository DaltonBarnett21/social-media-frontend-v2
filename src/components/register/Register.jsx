import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await axios
      .post("http://localhost:5000/api/auth/register", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src="/logo-no-background.png" alt="" className="h-16 mb-1 " />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col drop-shadow-md p-4"
      >
        <label className="text-center text-3xl mb-8 text-gray-600">
          Sign up
        </label>

        <input
          type="text"
          placeholder="First Name"
          className=" border border-gray-400 p-2 w-72 outline-none text-gray-500"
          {...register("firstname", { required: true })}
        />
        {errors.firstname?.type === "required" && (
          <p className=" text-red-500" role="alert">
            First name is required
          </p>
        )}
        <input
          type="text"
          placeholder="Last Name"
          className=" border border-gray-400 p-2 w-72 outline-none mt-3 text-gray-500"
          {...register("lastname", { required: true })}
        />
        {errors.lastname?.type === "required" && (
          <p className=" text-red-500" role="alert">
            Last name is required
          </p>
        )}
        <input
          type="text"
          placeholder="Username"
          className=" border border-gray-400 p-2 w-72 outline-none mt-3 text-gray-500"
          {...register("username", { required: true })}
        />
        {errors.email?.type === "required" && (
          <p className=" text-red-500" role="alert">
            Username is required
          </p>
        )}
        <input
          type="text"
          placeholder="Email"
          className=" border border-gray-400 p-2 w-72 outline-none mt-3 text-gray-500"
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <p className=" text-red-500" role="alert">
            Email is required
          </p>
        )}
        <input
          type="password"
          placeholder="Password"
          className=" border border-gray-400 p-2 w-72 outline-none mt-3 text-gray-500"
          {...register("password", { required: true })}
        />
        {errors.password?.type === "required" && (
          <p className=" text-red-500" role="alert">
            Password is required
          </p>
        )}
        <input
          type="password"
          placeholder="Confirm Password"
          className=" border border-gray-400 p-2 w-72 outline-none mt-3 text-gray-500"
          {...register("password", { required: true })}
        />
        {errors.password?.type === "required" && (
          <p className=" text-red-500" role="alert">
            Confirm Password is required
          </p>
        )}
        <button className=" bg-blue-500 w-2/3 mx-auto p-2 text-white hover:bg-blue-600 mt-6 ">
          Sign Up
        </button>
        <span className="text-center mt-8">
          Already have an account?{" "}
          <Link to="/login">
            <span className=" text-blue-500 hover:cursor-pointer">
              Sign In.
            </span>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
