import axios from "axios";
import { API_BASE_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

interface Permission {
  id: string;
  name: string;
}

const handleGet = async (type: string) => {
  const response = await axios.get<Permission[]>(`${API_BASE_URL}/${type}`);
  return response.data;
};

export function useGetPermissions() {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: () => handleGet("permissions"),
  });
}
