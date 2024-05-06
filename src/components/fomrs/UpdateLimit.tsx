"use client";
import { useState } from "react";
import { useUpdateLimit } from "../../hooks";

// input style
const inputStyle = `w-[90%] h-[55px] bg-transparent outline-none text-white text-[20px] border border-[#ffffff88] rounded-lg placeholder:text-white placeholder:text-[20px] p-[10px] `;

export const UpdateLimit = () => {
  const [categoryLimit, setCategoryLimit] = useState<number | null>(null);
  const [designLimit, setDesignLimit] = useState<number | null>(null);

  const queryBody = {
    categoryLimit,
    designLimit,
  };

  const { updatingLimitMutation } = useUpdateLimit();

  return (
    <div className=" w-[350px] h-[350px] mobile:w-[500px] mobile:h-[400px] bg-[#999999] rounded-lg overflow-scroll">
      <div className="w-[100%] h-[100%] flex flex-col items-center">
        <h1 className="text-white text-[25px] font-[500] mt-[20px]">
          Update Client Limit
        </h1>
        <div className="w-[100%]  flex flex-col items-center mt-[50px] gap-[30px]">
          <input
            type="text"
            placeholder="Set category limit"
            onChange={(e) => {
              const inputValue = parseInt(e.target.value);
              setCategoryLimit(inputValue);
            }}
            className={inputStyle}
          />
          <input
            type="text"
            placeholder="Set design limit"
            onChange={(e) => {
              const inputValue = parseInt(e.target.value);
              setDesignLimit(inputValue);
            }}
            className={inputStyle}
          />
        </div>
        <div className="w-[100%] flex flex-col justify-center items-center mt-[20px] gap-[10px]">
          <button
            className="w-[90%] flex justify-center items-center text-white font-[500] bg-[#2F94C4] hover:bg-[#60b8e0] p-[10px] pl-[15px] pr-[15px] rounded-lg"
            onClick={() => {
              updatingLimitMutation.mutate(queryBody);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
