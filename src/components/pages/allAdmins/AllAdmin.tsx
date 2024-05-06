import { DeletePage } from "../../ui";
import { useDeleteSubAdmin, useGetAllSubAdmin } from "../../../hooks";

export const AllAdmin = () => {
  const { admins } = useGetAllSubAdmin();
  const { subAdminDeleteMutation } = useDeleteSubAdmin();
  return (
    <div className="w-screen min-h-screen flex flex-col items-center  gap-[20px]">
      <div className="mt-[150px]">
        {" "}
        {admins?.map(({ id, name, email }) => {
          return (
            <div className="flex flex-col items-end">
              <div className="w-[60vw] h-[50px] flex justify-evenly  items-center gap-[10px] bg-gray-400 text-white rounded-lg">
                <div className=" capitalize font-[500] text-[20px]">
                  Name: {name}
                </div>
                <div className="  font-[500] text-[20px]">Email: {email}</div>
                <DeletePage
                  confirmation={() => {
                    subAdminDeleteMutation.mutate({ id });
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
