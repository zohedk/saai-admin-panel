import { useEffect, useRef, useState } from "react";
import {
  useAddDesign,
  useGetAdmin,
  useGetAllCategory,
  useGetSubAdmin,
  useUploadToAws,
} from "../../hooks";
import {
  selectOnlyCheckBox,
  pushToCheckbox,
  handleImgInput,
} from "../../helpers";
import { TbPhoto } from "react-icons/tb";
import toast from "react-hot-toast";

// input style
const inputStyle = `w-[90%] h-[55px] bg-transparent outline-none text-white text-[20px] border border-[#ffffff88] rounded-lg placeholder:text-white placeholder:text-[20px] p-[10px] `;

export const AddDesign = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [imageUrl4, setImageUrl4] = useState("");
  const [userType, setUserType] = useState<"admin" | "sub-admin">();
  const [categoryId, setCategoryId] = useState("");

  function resetDesingState() {
    setTitle("");
    setImageUrl("");
    setImageUrl2("");
    setImageUrl3("");
    setImageUrl4("");
  }
  // checkbox refs
  const checkbox = useRef<HTMLInputElement[]>([]);
  const queryBody = {
    body: {
      categoryId,
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
  const { addDesignMutation } = useAddDesign(resetDesingState);
  const { awsMutations } = useUploadToAws(setImageUrl, userType);
  const uploadeImage2 = useUploadToAws(setImageUrl2, userType);
  const uploadeImage3 = useUploadToAws(setImageUrl3, userType);
  const uploadeImage4 = useUploadToAws(setImageUrl4, userType);
  const { categories } = useGetAllCategory();

  useEffect(() => {
    if (admin) {
      setUserType("admin");
    }
    if (subAdmin) {
      setUserType("sub-admin");
    }
  }, [admin, subAdmin]);
  return (
    <div className=" w-[350px] mobile:w-[500px] min-h-[450px] bg-[#999999] rounded-lg overflow-scroll z-[10]">
      <div className="w-[100%] h-[100%] flex flex-col items-center">
        <h1 className="text-white text-[25px] font-[500] mt-[20px] capitalize">
          add design
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

          <div className="w-[90%] text-white flex flex-col  gap-[10px] flex-wrap">
            <h2 className="text-[20px] font-bold">Select a category</h2>
            <div className="text-white flex items-center gap-[20px] flex-wrap">
              {categories?.map(({ id, title }) => {
                return (
                  <label
                    key={id}
                    htmlFor={id}
                    className="flex items-center gap-[5px]"
                  >
                    <input
                      ref={(e) => {
                        pushToCheckbox(e, checkbox);
                      }}
                      onClick={(e) => {
                        selectOnlyCheckBox(e.currentTarget, checkbox);
                        setCategoryId(id);
                      }}
                      type="checkbox"
                      id={id}
                    />
                    <span>{title}</span>
                  </label>
                );
              })}
            </div>
          </div>
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
              addDesignMutation.mutate(queryBody);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
