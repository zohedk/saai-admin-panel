import { useEffect, useState } from "react";
import {
  useDeleteCategory,
  useGetAdmin,
  useGetCategory,
  useGetSubAdmin,
} from "../../../hooks";
import { DeletePage, EditPage } from "../../ui";
import { SofaCard } from "../../ui/SofaCard";
import { Link } from "react-router-dom";
import { UpdateCategoryForm } from "../../fomrs/UpdateCategory";

export const Sofa = () => {
  const [userType, setUserType] = useState<"admin" | "sub-admin" | "">("");
  const { categories } = useGetCategory();
  const { deleteCategoryMutaion } = useDeleteCategory();
  const { admin } = useGetAdmin();
  const { subAdmin } = useGetSubAdmin();

  useEffect(() => {
    if (admin) {
      setUserType("admin");
    }
    if (subAdmin) {
      setUserType("sub-admin");
    }
  }, [admin, subAdmin]);
  return (
    <div className="w-screen min-h-screen flex flex-col  items-center">
      <div
        className="relative w-screen h-[40vh] flex flex-col justify-center items-center bg-[#0000006e] bg-blend-multiply bg-cover bg-no-repeat bg-center gap-[10px]"
        style={{
          backgroundImage: "url('/sofa/banner-bg.jpeg')",
        }}
      >
        <h1 className="text-[35px] font-bold text-white box-content p-[6px] pl-[100px] pr-[100px] bg-[#00000085]">
          Sofa Set
        </h1>
      </div>
      {/* intro */}
      <div className="w-screen flex justify-center">
        <div className="w-screen   mobile:w-[80vw] flex flex-wrap justify-center  mt-[50px] mb-[50px] text-[18px] gap-[30px]">
          {categories?.map(({ id, title, imageUrl }) => {
            const link = title.split(" ").join("-");
            return (
              <div key={id} className="flex flex-col gap-[10px]">
                <Link key={id} to={`/sofa/${link}`}>
                  <SofaCard title={title} imageUrl={imageUrl} />
                </Link>
                <div className="flex items-center gap-[20px]">
                  <EditPage
                    component={<UpdateCategoryForm categoryTitle={title} />}
                  />
                  <DeletePage
                    confirmation={() => {
                      deleteCategoryMutaion.mutate({ id, userType });
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

{
  /* <div key={data.id}>

<div key={data.id}>
                  <Link key={id} to={`/sofa/${link}`}>
                <SofaCard title={title} imageUrl={imageUrl} />
              </Link>
                  <div className="flex items-center gap-[20px]">
                    <EditPage
                      component={<UpdateDesignForm designTitle={data.title} />}
                    />
                    <DeletePage
                      confirmation={() => {
                        deleteDesignMutaion.mutate({ id: data.id, userType });
                      }}
                    />
                  </div>
                </div> */
}
