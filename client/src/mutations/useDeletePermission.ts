import { useToast } from "@/components/ui/use-toast";
import { API_BASE_URL } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const handleDelete = async (type: string, id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/${type}/${id}`);
  return response.data;
};

export function useDeletePermission() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({ type, id }: { type: string; id: string }) =>
      handleDelete(type, id),
    onSuccess: (_, { type }) => {
      toast({
        title: "Success",
        description: `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } deleted successfully.`,
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
