import api from "@/api";
import { API_BASE_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const handleGet = async (type: string) => {
  const response = await api.get<User[]>(`${API_BASE_URL}/${type}`);
  return response.data;
};

export function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => handleGet("users"),
  });
}
