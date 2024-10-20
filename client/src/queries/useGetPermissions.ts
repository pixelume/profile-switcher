import api from "@/api";
import { API_BASE_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export interface Permission {
  id: string;
  name: string;
}

const handleGet = async (type: string) => {
  const response = await api.get<Permission[]>(`${API_BASE_URL}/${type}`);
  return response.data;
};

export function useGetPermissions() {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: () => handleGet("permissions"),
  });
}
