import { useEffect, useState } from "react";
import Link from "next/link";
import { getComplaints, useComplaints } from "../../hooks/useComplaints";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/apiClient";
import neighborhoods from "../../mocks/neighborhoods";
import statusOptions from "../../mocks/statusOptions";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  Link as ChakraLink,
  HStack,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useRouter } from "next/router";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { setupAPIClient } from "../../services/api";

export default function ComplaintsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<string>("all");
  const [neighborhood, setNeighborhood] = useState<string>("all");

  const { data, isLoading, isFetching, error } = useComplaints(
    currentPage,
    status,
    neighborhood
  );

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const router = useRouter();

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
          <Flex mb="8" justify="space-between" align="start" direction="column">
            <Heading size="lg" fontWeight="normal" mb="6">
              Denúncias
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <Flex w="full">
              <HStack>
                <Stack>
                  <label htmlFor="neighborhood">Bairro</label>
                  <Select
                    id="neighborhood"
                    onChange={(e) => {
                      setNeighborhood(e.target.value);
                    }}
                    defaultValue={neighborhood}
                  >
                    <option
                      value="all"
                      style={{ color: "white", backgroundColor: "#181B23" }}
                    >
                      Todos
                    </option>
                    {neighborhoods.map((hit) => (
                      <option
                        value={hit.id}
                        style={{ color: "white", backgroundColor: "#181B23" }}
                        key={hit.id}
                      >
                        {hit.name}
                      </option>
                    ))}
                  </Select>
                </Stack>
                <Stack>
                  <label htmlFor="status">Status</label>
                  <Select
                    id="status"
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                    defaultValue={status}
                  >
                    <option
                      value="all"
                      style={{ color: "white", backgroundColor: "#181B23" }}
                    >
                      Todos
                    </option>
                    {statusOptions.map((hit) => (
                      <option
                        value={hit.id}
                        style={{ color: "white", backgroundColor: "#181B23" }}
                        key={hit.id}
                      >
                        {hit.name}
                      </option>
                    ))}
                  </Select>
                </Stack>
              </HStack>
              <HStack ml="auto" mt="auto">
                <Input placeholder="Id da denúncia" />
                <Button
                  type="submit"
                  colorScheme="green"
                  isLoading={isLoading}
                  px="6"
                >
                  Buscar
                </Button>
              </HStack>
            </Flex>
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
