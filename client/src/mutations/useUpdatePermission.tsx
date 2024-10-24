import { API_BASE_URL } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Permission } from "@/queries/useGetPermissions";
import api from "@/api";

type UpdatePermission = Omit<Permission, "id">;

const handleUpdate = async (
  type: string,
  id: string,
  data: UpdatePermission,
) => {
  const response = await api.put(`${API_BASE_URL}/${type}/${id}`, data);
  return response.data;
};

export function useUpdatePermission() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({
      type,
      id,
      data,
    }: {
      type: string;
      id: string;
      data: UpdatePermission;
    }) => handleUpdate(type, id, data),
    onSuccess: (_, { type }) => {
      toast({
        title: "Success",
        description: `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } updated successfully.`,
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
