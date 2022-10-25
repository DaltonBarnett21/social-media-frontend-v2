import React from "react";
import Header from "../../components/Header/Header";
import Leftbar from "../../components/leftbar/Leftbar";
import NavMenu from "../../components/mobile/NavMenu";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { format } from "timeago.js";

const Notifications = () => {
  const [notifications, setNotifications] = useState();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getNotifications = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/notifications/${user.id}`
      );
      setNotifications(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    getNotifications();
  }, []);

  return (
    <div className=" bg-gray-100 h-full relative">
      <Header />
      <section className="flex">
        <div className="hidden lg:block lg:flex-[2] bg-white relative">
          <Leftbar />
        </div>
        <div className="flex-1 lg:block lg:flex-[5] lg:p-1 relative h-screen">
          {notifications?.map((notification, i) => (
            <div
              className="flex bg-white shadow-md m-4 justify-between p-4 rounded-md cursor-pointer hover:bg-gray-200"
              key={i}
            >
              <p>{notification.action}</p>
              <p>{format(notification.createdAt)}</p>
            </div>
          ))}
        </div>
        <div className="hidden lg:block lg:flex-[2] bg-white relative">
          <Rightbar />
        </div>
      </section>

      <NavMenu />
    </div>
  );
};

export default Notifications;
