import { useEffect, useState } from "react";
import Link from "next/link";
import { getComplaints, useComplaints } from "../../hooks/useComplaints";
import { queryClient } from "../../services/queryClient";
import { api } from '../../services/apiClient';

import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, Link as ChakraLink, HStack, Input, Select } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { setupAPIClient } from "../../services/api";

export default function ComplaintsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<string>('all');
  // const [isPendingActive, setIsPendingActive] = useState<boolean>(false);
  // const [isFinishedActive, setIsFinishedActive] = useState<boolean>(false);

  const { data, isLoading, isFetching, error } = useComplaints(currentPage, status);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const router = useRouter();

  async function filterSearch() {
    // const { data, isLoading, isFetching, error } = await useComplaints(currentPage, status);

    console.log({ currentPage, status });
    getComplaints(currentPage, status);
  }

  // async function handlePrefetchComplaint(complaintId: string) {
  //   await queryClient.prefetchQuery(['complaint', complaintId], async () => {
  //     const response = await api.get(`complaint/${complaintId}`);

  //     return response.data;
  //   }, {
  //     staleTime: 1000 * 60 * 10,  // 10 minutes
  //   })
  // }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          flex="1"
          borderRadius="8"
          bg="gray.800"
          p={["6", "8"]}
          overflowX="auto"
        >
          <Flex mb="8" justify="space-between" align={{ lg: "center", md: "start" }} direction={{ lg: "row", md: "column" }}>
            <Heading size="lg" fontWeight="normal">
              Denúncias
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <HStack spacing="4">
              <Select
                placeholder="Status"
                onChange={(e) => setStatus(e.target.value)}
                defaultValue={status}
              >
                <option
                  value="all"
                  style={{ color: "white", backgroundColor: "#181B23" }}
                >
                  Todos
                </option>
                <option
                  value="pending"
                  style={{ color: "white", backgroundColor: "#181B23" }}
                >
                  Pendente
                </option>
                <option
                  value="invalid"
                  style={{ color: "white", backgroundColor: "#181B23" }}
                >
                  Solicitação Inválida
                </option>
                <option
                  value="inAttendance"
                  style={{ color: "white", backgroundColor: "#181B23" }}
                >
                  Em Atendimento
                </option>
                <option
                  value="finished"
                  style={{ color: "white", backgroundColor: "#181B23" }}
                >
                  Concluído
                </option>
              </Select>
              <Input placeholder="Id da denúncia" />
              <Button
                type="submit"
                colorScheme="green"
                onClick={filterSearch}
                isLoading={isLoading}
                px="6"
              >
                Buscar
              </Button>
            </HStack>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados de denúncias.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th>CEP</Th>
                    {isWideVersion && <Th>Data de criação</Th>}
                    {isWideVersion && <Th>Status</Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {data.complaints.map((complaint) => {
                    return (
                      <Tr
                        key={complaint.id}
                        _hover={{ cursor: "pointer", color: "green.500" }}
                        onClick={() =>
                          router.push(`/complaints/${complaint.id}`)
                        }
                      >
                        <Td px={["4", "4", "6"]}>
                          <Box>
                            <ChakraLink
                            // onMouseEnter={() => handlePrefetchComplaint(complaint.id)}
                            >
                              <Text fontWeight="bold">{complaint.cep}</Text>
                            </ChakraLink>
                            <Text fontSize="sm" color="gray.300">
                              {complaint.email}
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{complaint.createdAt}</Td>}
                        {isWideVersion && (
                          <Td>
                            {complaint.status === "finished"
                              ? "Concluída"
                              : complaint.status === "pending"
                              ? "Pendente"
                              : complaint.status === "invalid"
                              ? "Inválida"
                              : complaint.status === "inAttendance" &&
                                "Em atendimento"}
                          </Td>
                        )}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/me");

  console.log(response.data);

  return {
    props: {},
  };
});