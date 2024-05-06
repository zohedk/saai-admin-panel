"use client";
import { useEffect, useState } from "react";
import {
  useUpdateDesign,
  useGetAdmin,
  useGetDesignByTitle,
  useGetSubAdmin,
  useUploadToAws,
} from "../../hooks";
import { handleImgInput } from "../../helpers";
import { TbPhoto } from "react-icons/tb";
import toast from "react-hot-toast";

// input style
const inputStyle = `w-[90%] h-[55px] bg-transparent outline-none text-white text-[20px] border border-[#ffffff88] rounded-lg placeholder:text-white placeholder:text-[20px] p-[10px] `;

interface UpdateDesignProp {
  designTitle: string;
}

export const UpdateDesignForm: React.FC<UpdateDesignProp> = ({
  designTitle,
}) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [imageUrl4, setImageUrl4] = useState("");
  const [userType, setUserType] = useState<"admin" | "sub-admin">();

  const queryBody = {
    body: {
      id,
      title: title.toLowerCase(),
      imageUrl,
      imageUrl2,
      imageUrl3,
      imageUrl4,
    },
    userType: userType!,
  };
  const { admin } = useGetAdmin();
  const { subAdmin } = useGetSubAdmin();
  const { updateDesignMutation } = useUpdateDesign();
  const { design } = useGetDesignByTitle({ title: designTitle });
  const { awsMutations } = useUploadToAws(setImageUrl, userType);
  const uploadeImage2 = useUploadToAws(setImageUrl2, userType);
  const uploadeImage3 = useUploadToAws(setImageUrl3, userType);
  const uploadeImage4 = useUploadToAws(setImageUrl4, userType);

  useEffect(() => {
    if (design) {
      setId(design.id);
      setTitle(design.title);
      setImageUrl(design.imageUrl);
      setImageUrl2(design.imageUrl2);
      setImageUrl3(design.imageUrl3);
      setImageUrl4(design.imageUrl4);
    }
  }, [design]);

  useEffect(() => {
    if (admin) {
      setUserType("admin");
    }
    if (subAdmin) {
      setUserType("sub-admin");
    }
  }, [admin, subAdmin]);
  return (
    <div className=" w-[350px] mobile:w-[500px] bg-[#999999] rounded-lg overflow-scroll z-[10]">
      <div className="w-[100%] h-[100%] flex flex-col items-center">
        <h1 className="text-white text-[25px] font-[500] mt-[20px] capitalize">
          update design
        </h1>
        <div className="w-[100%] flex flex-wrap  items-center gap-[10px] pl-[10px] pr-[10px]">
          {imageUrl !== "" && (
            <img src={imageUrl} alt="uploaded" className="mt-[20px] w-[25%]" />
          )}
          {imageUrl2 !== "" && (
            <img src={imageUrl2} alt="uploaded" className="mt-[20px] w-[25%]" />
          )}
          {imageUrl3 !== "" && (
            <img src={imageUrl3} alt="uploaded" className="mt-[20px] w-[25%]" />
          )}
          {imageUrl4 !== "" && (
            <img src={imageUrl4} alt="uploaded" className="mt-[20px] w-[25%]" />
          )}
        </div>
        <div className="w-[100%]  flex flex-col items-center mt-[50px] gap-[30px]">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className={inputStyle}
          />

          {/* image input */}
          <div className="w-[90%] flex items-center gap-[20px]">
            <button
              onClick={() => {
                handleImgInput(awsMutations.mutate);
              }}
            >
              <TbPhoto className="w-[30px] h-[30px] text-white hover:text-slate-800" />
            </button>
            <button
              onClick={() => {
                handleImgInput(uploadeImage2.awsMutations.mutate);
              }}
            >
              <TbPhoto className="w-[30px] h-[30px] text-white hover:text-slate-800" />
            </button>
            <button
              onClick={() => {
                handleImgInput(uploadeImage3.awsMutations.mutate);
              }}
            >
              <TbPhoto className="w-[30px] h-[30px] text-white hover:text-slate-800" />
            </button>
            <button
              onClick={() => {
                handleImgInput(uploadeImage4.awsMutations.mutate);
              }}
            >
              <TbPhoto className="w-[30px] h-[30px] text-white hover:text-slate-800" />
            </button>
          </div>
        </div>
        <div className="w-[100%] flex flex-col justify-center items-center mt-[20px] gap-[10px]">
          <button
            className="w-[90%] flex justify-center items-center text-white font-[500] bg-[#2F94C4] hover:bg-[#60b8e0] p-[10px] pl-[15px] pr-[15px] rounded-lg"
            onClick={() => {
              if (title === "") {
                return toast.error("title cannot be empty");
              }
              updateDesignMutation.mutate(queryBody);
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
