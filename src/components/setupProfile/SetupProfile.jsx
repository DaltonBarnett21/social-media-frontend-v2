import React from "react";
import { Progress } from "@material-tailwind/react";

const SetupProfile = () => {
  return (
    <div className="flex h-screen items-center flex-col  p-10 w-screen">
      <div className="flex justify-center ">
        <h2 className=" text-2xl">Lets Setup Your Account!</h2>
      </div>
      <div className="flex justify-center ">
        <Progress
          value={50}
          label="Completed"
          className=" w-72 mt-10 mx-auto"
        />
      </div>

      <div className="flex justify-center mt-10">form</div>
      <div className="flex justify-between mt-10 w-72 ">
        <button className=" bg-blue-500 rounded-md text-white p-2 w-20 hover:bg-blue-600">
          Previous
        </button>
        <button className=" bg-blue-500 rounded-md text-white p-2 w-20 hover:bg-blue-600">
          Next
        </button>
      </div>
      <div className="flex mt-10 text-sky-500 hover:cursor-pointer ">
        Skip Step
      </div>
    </div>
  );
};

export default SetupProfile;
