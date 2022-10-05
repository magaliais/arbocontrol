import { useQuery } from "@tanstack/react-query";
import { api } from "../services/apiClient";

type Complaint = {
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
  place: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

type GetComplaintsResponse = {
  complaints: Complaint[];
  totalCount: number;
};

export async function getComplaints(currentPage: number): Promise<GetComplaintsResponse> {
  const { data } = await api.get("complaints", {
    params: {
      currentPage,
    },
  });

  const totalCount = Number(data.totalCount);

  const complaints = data.complaints.map((complaint) => {
    return {
      id: complaint.id,
      status: complaint.status,
      cep: complaint.cep,
      street: complaint.street,
      neighborhood: complaint.neighborhood,
      houseNumber: complaint.houseNumber,
      complement: complaint.complement,
      reference: complaint.reference,
      cellphoneNumber: complaint.cellphoneNumber,
      phoneNumber: complaint.phoneNumber,
      email: complaint.email,
      place: complaint.place,
      notes: complaint.notes,
      createdAt: new Date(complaint.createdAt).toLocaleDateString("pt-br", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      updatedAt: complaint.updated_at,
    };
  });

  return {
    complaints,
    totalCount,
  };
}

export function useComplaints(currentPage: number) {
  return useQuery(["complaints", currentPage], () => getComplaints(currentPage), {
    staleTime: 1000 * 5, // 5 seconds
  });
}
