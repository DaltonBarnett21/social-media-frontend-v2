import React from "react";
import { Progress } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SetupProfile = () => {
  const [step, setStep] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const next = () => {
    setStep(step === 4 ? 4 : step + 1);
    setPercentage(percentage === 100 ? 100 : percentage + 25);
  };

  const previous = () => {
    setStep(step === 1 ? 1 : step - 1);
    setPercentage(percentage === 0 ? 0 : percentage - 25);
  };

  const stepper = (step) => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col w-96">
            <input
              type="text"
              placeholder="address"
              className=" border shadow-md p-2 mb-5 outline-none"
            />
            <input
              type="text"
              placeholder="state"
              className=" border shadow-md p-2 mb-5 outline-none"
            />
            <input
              type="text"
              placeholder="city"
              className=" border shadow-md p-2 mb-5 outline-none"
            />
            <input
              type="text"
              placeholder="phone number"
              className=" border shadow-md p-2 mb-5 outline-none"
            />
            <textarea
              cols="30"
              rows="10"
              placeholder="bio for your profile..."
              className=" border shadow-md p-2 mb-5 outline-none"
            ></textarea>
          </div>
        );
      case 2:
        return <h1>step 2</h1>;
      case 3:
        return <h1>step 3</h1>;
      case 4:
        return (
          <div>
            <button>Complete</button>
          </div>
        );

      default:
        return (
          <div className="flex justify-center ">
            <h2 className=" text-2xl">Lets Setup Your Profile!</h2>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen items-center flex-col justify-between  p-10 w-screen">
      <div className="flex justify-center ">
        <h2 className=" text-3xl">All Steps Are Optional!</h2>
      </div>
      <div className="flex justify-center ">
        <Progress
          value={percentage}
          variant="filled"
          label="Completed"
          className=" w-72 mt-10 mx-auto"
        />
      </div>

      <div className="flex justify-center mt-10">{stepper(step)}</div>
      <div className="flex justify-between mt-10 w-72 ">
        <button
          onClick={previous}
          className=" bg-blue-500 rounded-md text-white p-2 w-20 hover:bg-blue-600"
        >
          Previous
        </button>

        {step === 4 ? (
          <Link to="/">
            <button
              onClick={next}
              className=" bg-blue-500 rounded-md text-white p-2 w-20 hover:bg-blue-600"
            >
              Login
            </button>
          </Link>
        ) : (
          <button
            onClick={next}
            className=" bg-blue-500 rounded-md text-white p-2 w-20 hover:bg-blue-600"
          >
            Next
          </button>
        )}
      </div>

      {step === 4 ? null : (
        <div
          className="flex mt-10 text-sky-500 hover:cursor-pointer "
          onClick={next}
        >
          Skip Step
        </div>
      )}
    </div>
  );
};

export default SetupProfile;
