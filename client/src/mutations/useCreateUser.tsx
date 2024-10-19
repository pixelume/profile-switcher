import { useToast } from "@/components/ui/use-toast";
import { API_BASE_URL } from "@/lib/constants";
import { User } from "@/queries/useGetUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type CreateUser = Omit<User, "id">;

const handleCreate = async (type: string, data: CreateUser) => {
  const response = await axios.post(`${API_BASE_URL}/${type}`, data);
  return response.data;
};

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({ type, data }: { type: string; data: CreateUser }) =>
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
