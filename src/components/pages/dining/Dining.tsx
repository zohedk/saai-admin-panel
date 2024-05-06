import { useGetDiningDesigns } from "../../../hooks";
import { SofaCard } from "../../ui/SofaCard";

export const DiningPage = () => {
  const { designs } = useGetDiningDesigns();
  return (
    <div className="w-screen min-h-screen flex flex-col  items-center">
      <div
        className="relative w-screen h-[40vh] flex flex-col justify-center items-center bg-[#0000006e] bg-blend-multiply bg-cover bg-no-repeat bg-center gap-[10px]"
        style={{
          backgroundImage: "url('/sofa/banner-bg.jpeg')",
        }}
      >
        <h1 className="text-[35px] font-bold text-white box-content p-[6px] pl-[100px] pr-[100px] bg-[#00000085]">
          Dining Set
        </h1>
      </div>
      {/* intro */}
      <div className="w-screen flex justify-center">
        <div className="w-screen   mobile:w-[90vw] flex flex-wrap justify-center  mt-[50px] mb-[50px] text-[18px] gap-[30px]">
          {designs?.map(({ id, title, imageUrl }) => {
            return <SofaCard key={id} title={title} imageUrl={imageUrl} />;
          })}
        </div>
      </div>
    </div>
  );
};
