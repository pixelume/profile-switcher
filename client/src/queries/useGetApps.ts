import api from "@/api";
import { API_BASE_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export interface App {
  id: string;
  name: string;
}

const handleGet = async (type: string) => {
  const response = await api.get<App[]>(`${API_BASE_URL}/${type}`);
  return response.data;
};

export function useGetApps() {
  return useQuery({
    queryKey: ["apps"],
    queryFn: () => handleGet("apps"),
  });
}
