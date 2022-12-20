import { useQuery } from "@tanstack/react-query";
import { api } from "../services/apiClient";

type ComplaintResponse = {
  complaint: {
    id: string;
    status: string;
    cep: string;
    street: string;
    neighborhood: string;
    houseNumber: string;
    complement: string;
    reference: string;
    cellphoneNumber: string;
    phoneNumber: string;
    email: string;
    image: string;
    place: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
  }
};

export async function getComplaint(
  id: string | string[]
): Promise<ComplaintResponse> {
  const { data } = await api.get(`complaints/${id}`, {
    params: {},
  });
  
  const complaint = {
    id: data.id,
    status: data.status,
    cep: data.cep,
    street: data.street,
    neighborhood: data.neighborhood,
    houseNumber: data.houseNumber,
    complement: data.complement,
    reference: data.reference,
    cellphoneNumber: data.cellphoneNumber,
    phoneNumber: data.phoneNumber,
    email: data.email,
    image: data.image,
    place: data.place,
    notes: data.notes,
    createdAt: new Date(data.created_at).toLocaleDateString("pt-br", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    updatedAt: data.updated_at,
  }
  
  return { complaint };
}

export function useComplaint(id: string | string[]) {
  return useQuery(
    ["complaints", id],
    () => getComplaint(id),
    {
      staleTime: 1000 * 5, // 5 seconds
    }
  );
}
