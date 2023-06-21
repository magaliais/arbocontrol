import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Prefeitura de Juiz de Fora</Text>
          <Text color="gray.300" fontSize="small">
            pjf@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Gabriel Magalhães"
        src="https://assets.infra.grancursosonline.com.br/projeto/thumbnail-carrossel/prefeitura-de-juiz-de-fora-mg.png"
      />
    </Flex>
  );
}
