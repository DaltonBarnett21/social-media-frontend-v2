import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { update } from "../../redux/userSlice";

const AppContainer = ({ children }) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      await axios
        .post("/api/auth/verify", { token: token })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          dispatch(update(res.data.details));
        })
        .catch((err) => {
          localStorage.removeItem("token");
        });
    };
    verify();
  }, []);
  return children;
};

export default AppContainer;
