"use client";

import { useState } from "react";

interface EditPageProp {
  component: React.ReactNode;
}

export const EditPage: React.FC<EditPageProp> = ({ component }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <div>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="bg-blue-500 hover:bg-blue-400 text-white text-center w-[60px] h-[30px] font-bold  rounded-md"
        >
          Edit
        </button>
      </div>
      {open && (
        <div className=" bg-[#0000004f]  w-screen h-screen fixed top-0 right-0 flex justify-center items-center z-[3] overflow-scroll ">
          <div
            onClick={() => {
              setOpen(false);
            }}
            className=" bg-[#0000004f]  w-screen h-screen fixed top-0 right-0 flex justify-center items-center z-[3]"
          ></div>
          {/* render passed component */}
          {component}
        </div>
      )}
    </div>
  );
};
