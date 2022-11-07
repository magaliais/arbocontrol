import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';
import { makeServer } from '../services/mirage';
import { queryClient } from '../services/queryClient';
import { AuthProvider } from '../contexts/AuthContext';

// ? Inicia a fake API do mirage caso esteja em modo de desenvolvimento
// if(process.env.NODE_ENV === 'development') {
//     makeServer();
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>

          <ReactQueryDevtools />
        </QueryClientProvider>
      </AuthProvider>
    </ChakraProvider>
  );}

export default MyApp