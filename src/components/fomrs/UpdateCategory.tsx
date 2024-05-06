import { useEffect, useRef, useState } from "react";
import {
  useGetAdmin,
  useGetCategoryById,
  useGetSubAdmin,
  useUpdateCategory,
  useUploadToAws,
} from "../../hooks";
import { handleImgInput, handleDescriptionLenght } from "../../helpers";
import { TbPhoto } from "react-icons/tb";
import toast from "react-hot-toast";
// input style
const inputStyle = ` h-[55px] bg-transparent outline-none text-white text-[20px] border border-[#ffffff88] rounded-lg placeholder:text-white placeholder:text-[20px] p-[10px] `;

interface UpdateCategoryProp {
  categoryTitle: string;
}

export const UpdateCategoryForm: React.FC<UpdateCategoryProp> = ({
  categoryTitle,
}) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const [title3, setTitle3] = useState("");
  const [title4, setTitle4] = useState("");
  const [para1, setPara1] = useState("");
  const [para2, setPara2] = useState("");
  const [para3, setPara3] = useState("");
  const [para4, setPara4] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [popular, setPopular] = useState(false);
  const [userType, setUserType] = useState<"admin" | "sub-admin">();
  const [descriptionLetterCount, setDescriptionLetterCount] = useState(0);

  // ref
  const descriptionInput = useRef<HTMLInputElement | null>(null);

  const queryBody = {
    body: {
      id,
      title: title.trim().toLowerCase(),
      description,
      title1,
      title2,
      title3,
      title4,
      para1,
      para2,
      para3,
      para4,
      imageUrl,
      popular,
    },
    userType: userType!,
  };
  const { admin } = useGetAdmin();
  const { subAdmin } = useGetSubAdmin();
  const { updateCategoryMutaion } = useUpdateCategory();
  const { awsMutations } = useUploadToAws(setImageUrl, userType);
  const { category } = useGetCategoryById({ title: categoryTitle });

  useEffect(() => {
    if (category) {
      setId(category.id);
      setTitle(category.title);
      setDescription(category.description);
      setTitle1(category.title1);
      setTitle2(category.title2);
      setTitle3(category.title3);
      setTitle4(category.title4);
      setPara1(category.para1);
      setPara2(category.para2);
      setPara3(category.para3);
      setPara4(category.para4);
      setImageUrl(category.imageUrl);
      setPopular(category.popular);
    }
  }, [category]);

  useEffect(() => {
    if (admin) {
      setUserType("admin");
    }
    if (subAdmin) {
      setUserType("sub-admin");
    }
  }, [admin, subAdmin]);
  return (
    <div className=" w-[350px] mobile:w-[600px] min-h-[450px] bg-[#999999] rounded-lg overflow-scrol box-content pb-[10px] mt-[300px] mobile:mt-[150px] z-[10]">
      <div className="w-[100%] h-[100%] flex flex-col items-center">
        <h1 className="text-white text-[25px] font-[500] mt-[20px]">
          Update Category
        </h1>
        {imageUrl !== "" && (
          <img
            src={imageUrl}
            alt="uploaded"
            className="mt-[20px] w-[150px] h-[150px]"
          />
        )}
        <div className="w-[100%]  flex flex-col items-center mt-[50px] gap-[30px]">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className={` w-[90%] ${inputStyle} `}
          />
          <div className="w-[90%] flex items-center gap-[10px]">
            <input
              ref={descriptionInput}
              placeholder="Description"
              value={description}
              onChange={(e) => {
                handleDescriptionLenght(
                  e.target.value.length,
                  setDescriptionLetterCount
                );
                setDescription(e.target.value);
              }}
              className={`w-[90%] ${inputStyle}`}
            />
            <div className="text-white">{`/${descriptionLetterCount}`}</div>
          </div>
          <div className="w-[90%] flex flex-wrap items-center gap-[20px]">
            <input
              type="text"
              placeholder="Title1"
              value={title1}
              onChange={(e) => {
                setTitle1(e.target.value);
              }}
              className={` w-[45%] ${inputStyle} `}
            />
            <input
              type="text"
              placeholder="Title2"
              value={title2}
              onChange={(e) => {
                setTitle2(e.target.value);
              }}
              className={` w-[45%] ${inputStyle} `}
            />
            <input
              type="text"
              placeholder="Title3"
              value={title3}
              onChange={(e) => {
                setTitle3(e.target.value);
              }}
              className={` w-[45%] ${inputStyle} `}
            />
            <input
              type="text"
              placeholder="Title4"
              value={title4}
              onChange={(e) => {
                setTitle4(e.target.value);
              }}
              className={` w-[45%] ${inputStyle} `}
            />
          </div>
          <div className="w-[90%] flex flex-wrap items-center gap-[20px]">
            <input
              type="text"
              placeholder="Para 1"
              value={para1}
              onChange={(e) => {
                setPara1(e.target.value);
              }}
              className={` w-[45%] ${inputStyle} `}
            />
            <input
              type="text"
              placeholder="Para 2"
              value={para2}
              onChange={(e) => {
                setPara2(e.target.value);
              }}
              className={` w-[45%] ${inputStyle} `}
            />
            <input
              type="text"
              placeholder="Para 3"
              value={para3}
              onChange={(e) => {
                setPara3(e.target.value);
              }}
              className={` w-[45%] ${inputStyle} `}
            />
            <input
              type="text"
              placeholder="Para 4"
              value={para4}
              onChange={(e) => {
                setPara4(e.target.value);
              }}
              className={`w-[45%] ${inputStyle} `}
            />
          </div>
          <div className="w-[90%] flex items-center gap-[10px] text-white">
            <input
              id="popular"
              type="checkbox"
              onChange={() => {
                setPopular((crnt) => !crnt);
              }}
            />
            <label htmlFor="popular">Popular</label>
          </div>
          <div className="w-[90%]">
            <button
              onClick={() => {
                handleImgInput(awsMutations.mutate);
              }}
            >
              <TbPhoto className="w-[30px] h-[30px] text-white hover:text-slate-800" />
            </button>
          </div>

          {/* image input */}
        </div>
        <div className="w-[100%] flex flex-col justify-center items-center mt-[20px] gap-[10px]">
          <button
            className="w-[90%] flex justify-center items-center text-white font-[500] bg-[#2F94C4] hover:bg-[#60b8e0] p-[10px] pl-[15px] pr-[15px] rounded-lg"
            onClick={() => {
              if (title === "") {
                return toast.error("title cannot be empty");
              }
              if (description.length > 500) {
                return toast.error("description cannot this long");
              }
              updateCategoryMutaion.mutate(queryBody);
            }}
          >
            Update
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};
