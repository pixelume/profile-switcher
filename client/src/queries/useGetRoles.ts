import axios from "axios";
import { API_BASE_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

interface Role {
  id: string;
  name: string;
}

const handleGet = async (type: string) => {
  const response = await axios.get<Role[]>(`${API_BASE_URL}/${type}`);
  return response.data;
};

export function useGetRoles() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => handleGet("roles"),
  });
}
