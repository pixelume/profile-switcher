import axios from "axios";
import { API_BASE_URL } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { App } from "@/queries/useGetApps";

type UpdateApp = Omit<App, "id">;

const handleUpdate = async (type: string, id: string, data: UpdateApp) => {
  const response = await axios.put(`${API_BASE_URL}/${type}/${id}`, data);
  return response.data;
};

export function useUpdateApp() {
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
      data: UpdateApp;
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
        description: `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } updated successfully.`,
      });
    },
  });
}
