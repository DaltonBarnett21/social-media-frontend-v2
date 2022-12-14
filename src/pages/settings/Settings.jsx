import React from "react";
import Header from "../../components/Header/Header";
import Leftbar from "../../components/leftbar/Leftbar";
import NavMenu from "../../components/mobile/NavMenu";
import Rightbar from "../../components/rightbar/Rightbar";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PortraitIcon from "@mui/icons-material/Portrait";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Settings = () => {
  const [tabNumber, setTabNumber] = useState(1);
  const [profileImage, setProfileImage] = useState();
  const [coverImage, setCoverImage] = useState();
  const [profileImageState, setProfileImageState] = useState({
    isLoading: false,
    success: false,
    error: false,
  });
  const [coverImageState, setCoverImageState] = useState({
    isLoading: false,
    success: false,
    error: false,
  });

  const currentUser = useSelector((state) => state.user);

  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append("image", profileImage);
    profileImageState.isLoading = true;
    await axios
      .put(
        `http://localhost:5000/api/images/${currentUser.id}/profile-image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          contentType: "application/json",
        }
      )
      .then((res) => {
        profileImageState.success = true;
        profileImageState.isLoading = false;
      })
      .catch((err) => {
        profileImageState.isLoading = false;
        profileImageState.error = true;
      });
    formData.delete("image");
  };

  const uploadCoverImage = async () => {
    const formData = new FormData();
    formData.append("image", coverImage);
    coverImageState.isLoading = true;
    await axios
      .put(
        `http://localhost:5000/api/images/${currentUser.id}/cover-image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          contentType: "application/json",
        }
      )
      .then((res) => {
        coverImageState.success = true;
        coverImageState.isLoading = false;
      })
      .catch((err) => {
        coverImageState.isLoading = false;
        coverImageState.error = true;
      });
    formData.delete("image");
  };

  return (
    <div className=" bg-gray-100 h-full relative">
      <Header />
      <section className="flex">
        <div className="hidden lg:block lg:flex-[2] bg-white  relative">
          <Leftbar />
        </div>
        <div className="flex-1 lg:block lg:flex-[5] lg:p-1 relative text-black">
          <div className="flex text-gray-600">
            <div className="flex-[20%] border border-gray-200">
              {" "}
              <div className="bg-white w-36  lg:w-60 h-screen ">
                <div
                  className={` ${
                    tabNumber === 1
                      ? "bg-blue-400 text-white flex items-center w-full  p-4 border cursor-pointer"
                      : "flex items-center w-full  p-4 border cursor-pointer"
                  } `}
                  onClick={() => setTabNumber(1)}
                >
                  <PersonOutlineIcon />
                  <p className="ml-2">My Details</p>
                </div>
                <div
                  className={` ${
                    tabNumber === 2
                      ? "bg-blue-400 text-white flex items-center w-full  p-4 border cursor-pointer"
                      : "flex items-center w-full  p-4 border cursor-pointer"
                  } `}
                  onClick={() => setTabNumber(2)}
                >
                  <PortraitIcon />
                  <p className="ml-2">Profile</p>
                </div>
                <div
                  className={` ${
                    tabNumber === 3
                      ? "bg-blue-400 text-white flex items-center w-full  p-4 border cursor-pointer"
                      : "flex items-center w-full  p-4 border cursor-pointer"
                  } `}
                  onClick={() => setTabNumber(3)}
                >
                  <LockOpenIcon />
                  <p className="ml-2">Password</p>
                </div>
              </div>
            </div>
            <div className="flex-[80%] pl-4 bg-white">
              {tabNumber === 1 && (
                <>
                  <div className="flex justify-center p-4">
                    <h2 className=" text-2xl">Update Account Info</h2>
                  </div>
                  <div className=" w-2/3 ">
                    <div className="flex flex-col mb-4">
                      <label className="text-xl text-gray-500">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="Update Phone Number"
                        className=" shadow-md border border-gray-300 p-2 mt-2 outline-none"
                      />
                    </div>
                    <div className="flex flex-col mb-4">
                      <label className="text-xl text-gray-500">Address</label>
                      <input
                        type="text"
                        placeholder="Update Address"
                        className=" shadow-md border border-gray-300 p-2 mt-2 outline-none"
                      />
                    </div>
                    <div className="flex flex-col mt-20 w-1/2">
                      <button className=" bg-blue-400 p-2 rounded-md text-white hover:cursor-pointer hover:bg-blue-500">
                        Update
                      </button>
                    </div>
                  </div>
                </>
              )}
              {tabNumber === 2 && (
                <>
                  <div className="flex justify-center p-4">
                    <h2 className=" text-2xl">Update Profile</h2>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xl text-gray-500">
                      Update Profile Image
                    </label>
                    <div className="">
                      <input
                        onChange={(e) => setProfileImage(e.target.files[0])}
                        type="file"
                        className="mt-5 file:bg-blue-400 file:p-2 file:rounded-md file:border-none file:text-white cursor-pointer"
                      />

                      <button
                        onClick={uploadProfileImage}
                        className="bg-blue-400 p-2 rounded-md text-white mt-5 lg:mt-0 "
                      >
                        Upload Profile Image
                      </button>

                      {profileImageState.error && (
                        <div className="flex">
                          <p className="mr-2 ">Something Went Wrong!</p>
                          <CloseIcon className=" text-red-500" />
                        </div>
                      )}
                      {profileImageState.success && (
                        <div className="flex">
                          <p className="mr-2">Success!</p>
                          <CheckIcon className=" text-green-500" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col mt-10">
                    <label className="text-xl text-gray-500">
                      Update Cover Image
                    </label>
                    <div>
                      <input
                        onChange={(e) => setCoverImage(e.target.files[0])}
                        type="file"
                        className="mt-5 file:bg-blue-400 file:p-2 file:rounded-md file:border-none file:text-white cursor-pointer"
                      />
                      <button
                        onClick={uploadCoverImage}
                        className="bg-blue-400 p-2 rounded-md text-white mt-5 lg:mt-0"
                      >
                        Upload Cover Image
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col mt-10">
                    <label className="text-xl text-gray-500">
                      Profile Privacy
                    </label>
                    <p className="pr-1 mt-1">
                      Profiles are public by default, if you want your posts and
                      the users you're following to be private, you must toggle
                      your profile to private.
                    </p>
                    <div className="mt-2 flex items-center">
                      <input type="checkbox" className="h-5 w-5" />
                      <span className="ml-2">Private Profile</span>
                    </div>
                  </div>
                  <div className="flex flex-col mt-10 w-1/2">
                    <button className=" bg-blue-400 p-2 rounded-md text-white hover:cursor-pointer hover:bg-blue-500">
                      Update Privacy
                    </button>
                  </div>
                </>
              )}
              {tabNumber === 3 && (
                <>
                  <div className="flex justify-center p-4">
                    <h2 className=" text-2xl">Update Password</h2>
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label className="text-xl text-gray-500">
                      Update Password
                    </label>
                    <input
                      type="password"
                      autoComplete="new-password"
                      placeholder="Update Password"
                      className=" shadow-md border border-gray-300 p-2 mt-2 outline-none"
                    />
                  </div>
                  <div className="flex flex-col w-1/2 mt-5">
                    <label className="text-xl text-gray-500">
                      Confirm Updated Password
                    </label>
                    <input
                      type="password"
                      placeholder="Updated Password"
                      className=" shadow-md border border-gray-300 p-2 mt-2 outline-none"
                    />
                  </div>
                  <div className="flex flex-col mt-10 w-60">
                    <button className=" bg-blue-400 p-2 rounded-md text-white hover:cursor-pointer hover:bg-blue-500">
                      Update
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:flex-[2] bg-white relative">
          <Rightbar />
        </div>
      </section>

      <NavMenu />
    </div>
  );
};

export default Settings;
