import React from "react";
import Header from "../components/Header/Header";
import Leftbar from "../components/leftbar/Leftbar";
import NavMenu from "../components/mobile/NavMenu";
import Rightbar from "../components/rightbar/Rightbar";

const MainLayout = ({ children }) => {
  return (
    <div className=" bg-gray-100 h-full relative">
      <Header />
      <section className="flex">
        <div className="hidden lg:block lg:flex-[2] bg-white relative">
          <Leftbar />
        </div>
        <div className="flex-1 lg:block lg:flex-[5] lg:p-1 relative ">
          {children}
        </div>
        <div className="hidden lg:block lg:flex-[2] bg-white relative">
          <Rightbar />
        </div>
      </section>

      <NavMenu />
    </div>
  );
};

export default MainLayout;
