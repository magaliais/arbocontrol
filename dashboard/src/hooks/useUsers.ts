import { useQuery } from "@tanstack/react-query";
import { api } from "../services/apiClient";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersResponse = {
  users: User[];
  totalCount: number;
}

export async function getUsers(currentPage: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get("users", {
    params: {
      currentPage,
    }
  });

  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString("pt-br", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return {
    users,
    totalCount,
  };
}

export function useUsers(currentPage: number) {
  return useQuery(
    ["users", currentPage],
    () => getUsers(currentPage), 
    {
      staleTime: 1000 * 5, // 5 seconds
    }
  );
}