import { useToast } from "@/components/ui/use-toast";
import { API_BASE_URL } from "@/lib/constants";
import { Permission } from "@/queries/useGetPermissions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type CreatePermission = Omit<Permission, "id">;

const handleCreate = async (type: string, data: CreatePermission) => {
  const response = await axios.post(`${API_BASE_URL}/${type}`, data);
  return response.data;
};

export function useCreatePermission() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({ type, data }: { type: string; data: CreatePermission }) =>
      handleCreate(type, data),
    onSuccess: (_, { type }) => {
      toast({
        title: "Success",
        description: `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } created successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: [type] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });
}
