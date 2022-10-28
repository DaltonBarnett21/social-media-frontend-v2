import React from "react";
import Header from "../components/Header/Header";
import Leftbar from "../components/leftbar/Leftbar";
import NavMenu from "../components/mobile/NavMenu";

const ProfileLayout = ({ children }) => {
  return (
    <div className="  h-screen relative">
      <Header />
      <section className="flex h-screen ">
        <div className="hidden lg:block lg:flex-[2] bg-white relative">
          <Leftbar />
        </div>
        <div className="flex-1 lg:block lg:flex-[5] lg:p-10">{children}</div>
      </section>
      <NavMenu />
    </div>
  );
};

export default ProfileLayout;
