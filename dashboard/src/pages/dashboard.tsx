import React, { useEffect } from 'react'
import dynamic from 'next/dynamic';
import { Box, Flex, SimpleGrid, Spinner, Text, theme } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar';
import { useComplaintsStatus } from '../hooks/useComplaintsStatus';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';
import { setupAPIClient } from '../services/api';

export default function Dashboard() {
  const { user, signOut } = useAuth();

  const { data, isLoading, isFetching, error } = useComplaintsStatus();

  useEffect(() => {
    api.get("/me", {params: {
      
    }})
      .then((response) => console.log(response));
  }, []);

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Total
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Text>
            <Flex minH="50px">
              {isLoading ? (
                <Flex w="100%" justify="center">
                  <Spinner />
                </Flex>
              ) : (
                <Flex w="100%" height="100%" justify="center" align="center">
                  <Text fontSize="2xl">{data?.complaintsStatus.total}</Text>
                </Flex>
              )}
            </Flex>
          </Box>
          <Box p={["6", "8"]} bg="#bc3232" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Pendentes
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Text>
            <Flex minH="50px">
              {isLoading ? (
                <Flex w="100%" justify="center">
                  <Spinner />
                </Flex>
              ) : (
                <Flex w="100%" height="100%" justify="center" align="center">
                  <Text fontSize="2xl">{data?.complaintsStatus.pending}</Text>
                </Flex>
              )}
            </Flex>
          </Box>
          <Box p={["6", "8"]} bg="green.600" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Finalizadas
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Text>
            <Flex>
              {isLoading ? (
                <Flex w="100%" justify="center">
                  <Spinner />
                </Flex>
              ) : (
                <Flex w="100%" justify="center">
                  <Text fontSize="2xl">{data?.complaintsStatus.finished}</Text>
                </Flex>
              )}
            </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
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