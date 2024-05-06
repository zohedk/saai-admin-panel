"use client";

import React, { useState } from "react";

interface DeletePageProps {
  confirmation: () => void;
}

export const DeletePage: React.FC<DeletePageProps> = ({ confirmation }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="bg-red-500 hover:bg-red-400 text-white text-center w-[60px] h-[30px] font-bold  rounded-md"
        >
          Delete
        </button>
      </div>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className=" bg-[#0000004f]  w-screen h-screen fixed top-0 right-0 flex justify-center items-center z-10 "
        >
          {/* card */}
          <div className="w-[300px] h-[200px] flex flex-col justify-center items-center bg-[#23252d] rounded-md ">
            <div className="text-white text-[20px] font-bold">
              Are you sure?
            </div>
            <button
              onClick={confirmation}
              className="bg-red-500 hover:bg-red-400 text-white text-center w-[60px] h-[30px] font-bold mt-[30px] rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
