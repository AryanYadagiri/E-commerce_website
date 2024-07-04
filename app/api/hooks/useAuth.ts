import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAuthStatus = async () => {
  const { data } = await axios.get("/api/auth/status");
  return data;
};

export const useAuth = () => {
  return useQuery({ queryKey: ["authStatus"], queryFn: fetchAuthStatus });
};
