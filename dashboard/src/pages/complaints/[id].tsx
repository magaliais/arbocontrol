import Link from "next/link";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Select,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import Input from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/apiClient";
import { useRouter } from "next/router";
import { useComplaint } from "../../hooks/useComplaint";
import { useEffect, useState } from "react";
import statusOptions from "../../mocks/statusOptions";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function CreateUser() {
  const [status, setStatus] = useState<string>("");

  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isFetching, error } = useComplaint(id);

  useEffect(() => {
    setStatus(data?.complaint?.status);
    if (typeof id === "string") {
      localStorage.setItem("@arbocontrol:id", id);
    }
  }, [data]);

  async function submitStatus() {
    api.post("/update-status", {
      id: id,
      status: status,
    });
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box as="form" flex="1" borderRadius="8" bg="gray.800" p={["6", "8"]}>
          <Heading
            size="lg"
            fontWeight="normal"
            onClick={async () => {
              if (typeof id === "string") {
                await navigator.clipboard.writeText(id);
              }
            }}
          >
            Denúncia {id}
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          {/* <VStack spacing="6" align="start">
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
          </VStack> */}

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="cep"
                label="CEP"
                value={data?.complaint?.cep}
                _disabled={{ color: "white" }}
                isDisabled={true}
              />
              <Input
                name="street"
                label="Rua"
                value={data?.complaint?.street}
                _disabled={{ color: "white" }}
                isDisabled={true}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="neighborhood"
                label="Bairro"
                value={data?.complaint?.neighborhood}
                _disabled={{ color: "white" }}
                isDisabled={true}
              />
              <Input
                name="houseNumber"
                label="Número"
                value={data?.complaint?.houseNumber}
                _disabled={{ color: "white" }}
                isDisabled={true}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="complement"
                label="Complemento"
                value={data?.complaint?.complement}
                _disabled={{ color: "white" }}
                isDisabled={true}
              />
              <Input
                name="reference"
                label="Referência"
                value={data?.complaint?.reference}
                _disabled={{ color: "white" }}
                isDisabled={true}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="cellphoneNumber"
                label="Número de celular"
                value={data?.complaint?.cellphoneNumber}
                _disabled={{ color: "white" }}
                isDisabled={true}
              />
              <Input
                name="phoneNumber"
                label="Número de telefone"
                value={data?.complaint?.phoneNumber}
                _disabled={{ color: "white" }}
                isDisabled={true}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="email"
                label="Email"
                value={data?.complaint?.email}
                _disabled={{ color: "white" }}
                isDisabled={true}
              />
              <Input
                name="notes"
                label="Observações"
                value={data?.complaint?.notes}
                _disabled={{ color: "white" }}
                isDisabled={true}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="createdAt"
                label="Data da criação"
                value={data?.complaint?.createdAt}
                _disabled={{ color: "white" }}
                isDisabled={true}
              />
              <Input
                name="updatedAt"
                label="Data da última atualização"
                value={data?.complaint?.updatedAt}
                _disabled={{ color: "white" }}
                isDisabled={true}
              />
            </SimpleGrid>

            {status && (
              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <HStack>
                  <Select onChange={(e) => setStatus(e.target.value)}>
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
                </HStack>
              </SimpleGrid>
            )}

            <img src={data?.complaint?.image} alt="" />
          </VStack>

          <Flex mt="8" justify={["center", "flex-end"]}>
            {/* <HStack>
              {status === 'pending' ? 
              (<Button colorScheme="red" onClick={() => setStatus('finished')}>Finalizar</Button>) : 
              (<Button colorScheme="green" onClick={() => setStatus('pending')}>Reabrir</Button>)}
            </HStack> */}

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
