import React from "react";
import Header from "../../components/Header/Header";
import Leftbar from "../../components/leftbar/Leftbar";
import NavMenu from "../../components/mobile/NavMenu";

import Rightbar from "../../components/rightbar/Rightbar";

import Feed from "../../components/feed/Feed";

const Home = () => {
  return (
    <div className=" bg-gray-100 h-full relative">
      <Header />
      <section className="flex">
        <div className="hidden lg:block lg:flex-[2] bg-white relative">
          <Leftbar />
        </div>
        <Feed />
        <div className="hidden lg:block lg:flex-[2] bg-white relative">
          <Rightbar />
        </div>
      </section>

      <NavMenu />
    </div>
  );
};

export default Home;
