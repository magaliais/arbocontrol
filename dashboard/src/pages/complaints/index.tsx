import { useState } from "react";
import Link from "next/link";
import { useComplaints } from "../../hooks/useComplaints";
import { queryClient } from "../../services/queryClient";
import { api } from '../../services/apiClient';

import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, Link as ChakraLink } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useRouter } from "next/router";

export default function ComplaintsList() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, error } = useComplaints(currentPage);

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

        <Box flex="1" borderRadius="8" bg="gray.800" p={["6", "8"]} overflowX="auto">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Denúncias
              { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" /> }
            </Heading>
          </Flex>

          { isLoading ? (
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
                  {data.complaints.map(complaint => {
                    return(
                      <Tr key={complaint.id} _hover={{ cursor: 'pointer', color: 'green.500' }} onClick={() => router.push(`/complaints/${complaint.id}`)}>
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
                        {isWideVersion && <Td>{complaint.status === "finished" ? "Finalizada" : "Pendente"}</Td>}
                      </Tr>
                    )
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