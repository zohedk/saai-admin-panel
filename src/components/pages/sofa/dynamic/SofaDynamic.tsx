import { UpdateDesignForm } from "../../../fomrs";
import {
  useDeleteDesign,
  useGetAdmin,
  useGetDesigns,
  useGetSubAdmin,
} from "../../../../hooks";
import { DeletePage, EditPage, SofaCard } from "../../../ui";
import { SofaBanner } from "./Banner";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface SofaProps {
  location?: string;
  title?: string;
}

export const SofaDynamicPage: React.FC<SofaProps> = () => {
  const [userType, setUserType] = useState<"admin" | "sub-admin" | "">("");
  const { categoryName } = useParams();
  const createdTitle = categoryName?.split("-").join(" ").trim();
  const { admin } = useGetAdmin();
  const { subAdmin } = useGetSubAdmin();
  const { designs } = useGetDesigns({ categoryTitle: createdTitle });
  const { deleteDesignMutaion } = useDeleteDesign();

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
      <SofaBanner title={createdTitle} />

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-[10px]">
          <h1 className="text-[25px] mobile:text-[30px] font-bold  capitalize">
            {createdTitle}
          </h1>
          <div className="w-[100px] h-[3px] bg-[#B19777]"></div>
        </div>
        <div className="w-screen flex flex-wrap justify-center items-center gap-[40px] mt-[30px] mb-[50px]">
          {designs
            ?.filter(({ title }) => title.toLowerCase() !== "dining set")
            .map((data) => {
              return (
                <div key={data.id} className="flex flex-col gap-[10px]">
                  <SofaCard title={data.title} imageUrl={data.imageUrl} />
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
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
