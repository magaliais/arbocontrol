import Link from "next/link";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { queryClient } from "../../services/queryClient";
import { useMutation } from "@tanstack/react-query";

import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/apiClient";
import { useRouter } from "next/router";
import { useComplaint } from "../../hooks/useComplaint";
import { useEffect, useState } from "react";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function CreateUser() {
  const [status, setStatus] = useState<string>('');

  const router = useRouter();
  const { id } = router.query;
  
  const { data, isLoading, isFetching, error } = useComplaint(id);

  useEffect(() => {
    setStatus(data?.complaint?.status);
    if(typeof id === 'string') {
      localStorage.setItem("@arbocontrol:id", id);
    }
  }, [data]);

  async function submitStatus() {
    api.post('/update-status', {
      id: id,
      status: status,
    })
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius="8"
          bg="gray.800"
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="normal" onClick={async () => {
            if(typeof id === 'string') {
              await navigator.clipboard.writeText(id);
            }
          }}>
            Denúncia {id}
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="6" align="start">
            {data?.complaint?.cep && <Text>CEP: {data?.complaint?.cep}</Text>}
            {data?.complaint?.street && <Text>Rua: {data?.complaint?.street}</Text>}
            {data?.complaint?.neighborhood && <Text>Bairro: {data?.complaint?.neighborhood}</Text>}
            {data?.complaint?.houseNumber && <Text>Número: {data?.complaint?.houseNumber}</Text>}
            {data?.complaint?.complement && <Text>Complemento: {data?.complaint?.complement}</Text>}
            {data?.complaint?.reference && <Text>Referência: {data?.complaint?.reference}</Text>}
            {data?.complaint?.cellphoneNumber && <Text>Número de celular: {data?.complaint?.cellphoneNumber}</Text>}
            {data?.complaint?.phoneNumber && <Text>Número de telefone: {data?.complaint?.phoneNumber}</Text>}
            {data?.complaint?.email && <Text>Email: {data?.complaint?.email}</Text>}
            {data?.complaint?.notes && <Text>Observações: {data?.complaint?.notes}</Text>}
            {data?.complaint?.createdAt && <Text>Data da criação: {data?.complaint?.createdAt}</Text>}
              {status && (
                <HStack justify="space-between" width="100%">
                  <Text>Status: {status === 'pending' ? "Pendente" : "Finalizada"}</Text>
                  {status === 'pending' ? 
                    (<Button colorScheme="green" onClick={() => setStatus('finished')}>Finalizar</Button>) : 
                    (<Button colorScheme="green" onClick={() => setStatus('pending')}>Reabrir</Button>)}
                </HStack>
              )}
            <img src={data?.complaint?.image} alt="" />
          </VStack>

          <Flex mt="8" justify={["center", "flex-end"]}>
            <HStack spacing="4">
              <Link href="/complaints" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                colorScheme="green"
                onClick={submitStatus}
                // isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}