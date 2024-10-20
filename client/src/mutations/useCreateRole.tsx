import api from "@/api";
import { useToast } from "@/components/ui/use-toast";
import { API_BASE_URL } from "@/lib/constants";
import { Role } from "@/queries/useGetRoles";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateRole = Omit<Role, "id">;

const handleCreate = async (type: string, data: CreateRole) => {
  const response = await api.post(`${API_BASE_URL}/${type}`, data);
  return response.data;
};

export function useCreateRole() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({ type, data }: { type: string; data: CreateRole }) =>
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
    onError: (_, { type }) => {
      toast({
        title: "Error",
        description: `Failed to create ${type}. Please try again.`,
        variant: "destructive",
      });
    },
  });
}
