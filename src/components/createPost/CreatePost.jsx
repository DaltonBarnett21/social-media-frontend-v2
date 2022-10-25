import React from "react";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import SendIcon from "@mui/icons-material/Send";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/postSlice";
import { toast, ToastContainer } from "react-toastify";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState();
  const [image, setImage] = useState();
  const [imageBoxIsOpen, setImageBoxIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [profileImage, setProfileImage] = useState();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`http://localhost:5000/api/users/${user.id}`);
      setProfileImage(res.data.profilePicture);
    };
    getUser();
  }, []);

  const [post, setPost] = useState({
    desc: "",
  });

  const notify = () => {
    toast.success("Post Success!!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newPost = {};
    newPost[name] = value;
    if (newPost.desc.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    setPost({ ...post, ...newPost });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("desc", post.desc);
    if (image) {
      await axios.post(
        `http://localhost:5000/api/images/${user.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
          contentType: "application/json",
        }
      );
    } else {
      await axios.post(
        `http://localhost:5000/api/posts/${user.id}`,
        {
          userId: user.id,
          desc: post.desc,
        },
        { withCredentials: true, contentType: "application/json" }
      );
    }

    setIsDisabled(true);
    dispatch(update(post));
    inputRef.current.value = "";
    setImagePreview("");
    setImage("");
    setImageBoxIsOpen(false);
    notify();
  };

  const handleImageChange = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    setImageBoxIsOpen(false);
    setIsDisabled(false);
  };

  const handleImageDropDown = () => {
    setImagePreview("");
    setImageBoxIsOpen(!imageBoxIsOpen);
  };

  return (
    <div className="bg-white m-5 shadow-md rounded-lg">
      <ToastContainer
        autoClose={1000}
        closeButton={false}
        hideProgressBar={true}
      />
      <form onSubmit={handleSubmit} className=" ">
        <Link to={`/user/${user.id}`}>
          <div className="flex p-3  ">
            <div className="h-12 w-12">
              <img
                src={profileImage ? profileImage : "/no-avatar.png"}
                className=" rounded-full w-full h-full  object-cover cursor-pointer"
                alt=""
              />
            </div>

            <div className="flex flex-col ml-2 text-sm cursor-pointer w-full">
              <div className="flex">
                <p className=" font-bold mr-1">{user.firstname}</p>{" "}
                <p className=" font-bold">{user.lastname}</p>
              </div>

              <p className=" mt-0 text-gray-500">@{user.username}</p>
            </div>
          </div>
        </Link>

        <input
          placeholder={`What's on your mind, ${user.firstname}?`}
          autoComplete="off"
          type="text"
          className="w-full p-5 outline-none text-gray-600 h-20"
          name="desc"
          onChange={handleChange}
          ref={inputRef}
        />

        <hr />
        <div className="p-4 flex justify-between">
          <div className="flex relative">
            <div className="mr-5" onClick={handleImageDropDown}>
              <PhotoLibraryIcon
                // onClick={setImageBoxIsOpen(!imageBoxIsOpen)}
                className=" text-green-600 cursor-pointer  hover:scale-125"
              />
            </div>
          </div>

          <button disabled={isDisabled}>
            <SendIcon
              role="button"
              type="submit"
              className={`  ${
                isDisabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-sky-500 cursor-pointer"
              }`}
            />
          </button>
        </div>
        {imageBoxIsOpen && (
          <>
            <div className="mt-5 flex rounded-lg bg-sky-500 py-2 px-4">
              <div className="">
                <input
                  onChange={handleImageChange}
                  type="file"
                  placeholder="Enter image"
                  className="flex-1 text-sm text-white file:mr-4 file:py-2 file:px-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-white hover:file:bg-yellow-500 hover:cursor-pointer "
                />
              </div>
            </div>
          </>
        )}
      </form>

      {imagePreview && (
        <div className="mt-10 pl-12 pr-12 pb-10 relative">
          <HighlightOffIcon
            onClick={() => setImagePreview("")}
            className=" text-white absolute right-12 m-2 hover:cursor-pointer"
            style={{ fontSize: "35px" }}
          />
          <img
            src={imagePreview}
            alt="upload"
            className=" w-full rounded-xl object-cover shadow-lg "
          />
        </div>
      )}
    </div>
  );
};

export default CreatePost;
