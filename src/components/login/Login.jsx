import React from "react";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../redux/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const newLoginState = {};
    newLoginState[e.target.name] = e.target.value;

    setLoginState({ ...loginState, ...newLoginState });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/auth/login", loginState)
      .then((res) => {
        dispatch(update(res.data));
         
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("profilePicture", res.data.profilePicture);
        localStorage.setItem("coverPicture", res.data.coverPicture);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src="/logo-no-background.png" alt="" className="h-16 mb-20 " />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col drop-shadow-md p-4"
      >
        <label className="text-center text-3xl mb-8 text-gray-600">
          Sign In
        </label>

        <input
          type="text"
          ref={emailRef}
          name="email"
          placeholder="Email"
          className=" border border-gray-400 p-2 w-72 outline-none mb-5 text-gray-500"
          onChange={handleChange}
        />
        <input
          type="password"
          ref={passwordRef}
          name="password"
          placeholder="Password"
          className=" border border-gray-400 p-2 w-72 outline-none mb-5 text-gray-500"
          onChange={handleChange}
        />
        <button className=" bg-blue-500 w-2/3 mx-auto p-2 text-white hover:bg-blue-600 mt-6 ">
          Sign In
        </button>
        <span className="text-center mt-8">
          Don't have an account?{" "}
          <span className=" text-blue-500 hover:cursor-pointer">Sign Up.</span>
        </span>
      </form>
    </div>
  );
};

export default Login;
