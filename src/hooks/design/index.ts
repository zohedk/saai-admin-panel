import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../../constant";

export interface CategoryDesign {
  id: string;
  title: string;
  imageUrl: string;
  imageUrl2: string;
  imageUrl3: string;
  imageUrl4: string;
  categoryId: string;
}

export const useGetDesigns = ({
  categoryTitle,
}: {
  categoryTitle: string | undefined;
}) => {
  const query = useQuery({
    queryKey: ["get-design"],
    queryFn: async () => {
      const { data } = await axios.post(`${baseUrl}/design`, { categoryTitle });

      return data as {
        designs: CategoryDesign[];
      };
    },
  });
  return { ...query, designs: query.data?.designs };
};
export const useGetDiningDesigns = () => {
  const query = useQuery({
    queryKey: ["get-design"],
    queryFn: async () => {
      const { data } = await axios.post(`${baseUrl}/design/dining`);

      return data as {
        designs: CategoryDesign[];
      };
    },
  });
  return { ...query, designs: query.data?.designs };
};

export const useGetDesignByTitle = (body: { title: string }) => {
  const query = useQuery({
    queryKey: ["get-design-by-id"],
    queryFn: async () => {
      const data = (await axios.post(`${baseUrl}/design/id`, body)).data;

      return data as { design: CategoryDesign };
    },
  });

  return { ...query, design: query.data?.design };
};

export const useAddDesign = (resetDesignState: any) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["adding-design"],
    mutationFn: async ({
      body,
      userType,
    }: {
      body: Object;
      userType: string;
    }) => {
      let token;
      if (userType === "admin") {
        token = localStorage.getItem("saai-admin-token");
      } else {
        token = localStorage.getItem("saai-sub-admin-token");
      }
      toast.loading("adding design", { id: "adding-design" });

      const { data } = await axios.post(
        `${baseUrl}/design/${userType}/create`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-design"] });
      toast.success("added successfully", { id: "adding-design" });
      resetDesignState();
    },
    onError: (error) => {
      // @ts-ignore
      const message = error.response.data.message;
      toast.error(message ? message : "error", { id: "adding-design" });
    },
  });
  return { addDesignMutation: mutation, design: mutation.data };
};

export const useDeleteDesign = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["deleted-design"],
    mutationFn: async ({ id, userType }: { id: string; userType: string }) => {
      let token;
      if (userType === "admin") {
        token = localStorage.getItem("saai-admin-token");
      } else {
        token = localStorage.getItem("saai-sub-admin-token");
      }

      toast.loading("deleting design", { id: "deleting-design" });
      const data = (
        await axios.delete(`${baseUrl}/design/${userType}/delete`, {
          data: { id },
          headers: { Authorization: `Bearer ${token}` },
        })
      ).data;
      return data;
    },
    onSuccess: () => {
      toast.success("deleted successfully", { id: "deleting-design" });
      queryClient.invalidateQueries({ queryKey: ["get-design"] });
    },
    onError: () => {
      toast.error("Error", { id: "deleting-design" });
    },
  });
  return { deleteDesignMutaion: mutation, data: mutation.data };
};

export const useUpdateDesign = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-design"],
    mutationFn: async ({
      body,
      userType,
    }: {
      body: object;
      userType: string;
    }) => {
      let token;
      if (userType === "admin") {
        token = localStorage.getItem("saai-admin-token");
      } else {
        token = localStorage.getItem("saai-sub-admin-token");
      }

      toast.loading("updating project", { id: "update-design" });
      const data = (
        await axios.put(`${baseUrl}/design/${userType}/update`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data;

      return data;
    },
    onSuccess: () => {
      toast.success("successfull", { id: "update-design" });
      queryClient.invalidateQueries({ queryKey: ["get-design"] });
    },
    onError: () => {
      toast.error("error", { id: "update-design" });
    },
  });

  return { updateDesignMutation: mutation };
};
