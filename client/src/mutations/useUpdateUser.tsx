import { API_BASE_URL } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/queries/useGetUsers";
import api from "@/api";

type UpdateUser = Omit<User, "id">;

const handleUpdate = async (type: string, id: string, data: UpdateUser) => {
  const response = await api.put(`${API_BASE_URL}/${type}/${id}`, data);
  return response.data;
};

export function useUpdateUser() {
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
      data: UpdateUser;
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
    onError: (_, { type }) => {
      toast({
        title: "Error",
        description: `Failed to update ${type}. Please try again.`,
        variant: "destructive",
      });
    },
  });
}
