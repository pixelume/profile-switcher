import { useToast } from "@/components/ui/use-toast";
import { API_BASE_URL } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const handleCreate = async (type: string, data: any) => {
  const response = await axios.post(`${API_BASE_URL}/${type}`, data);
  return response.data;
};

export function useCreatePermission() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({ type, data }: { type: string; data: any }) =>
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
