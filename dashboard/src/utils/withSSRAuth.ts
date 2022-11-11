import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";
import decode from 'jwt-decode';
import { validateUserPermissions } from "./validateUserPermissions";

type WithSSRAuthOptions = {
  permissions?: string[];
  roles?: string[];
}

// ? Higher-order-function => programação funcional
// ? recebe uma função como argumento ou retorna uma função como resultado
export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: WithSSRAuthOptions) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    // Quando estamos requisitando o cookie na camada de servidor, é necessário
    // passar o contexto (ctx) como primeiro parâmetro
    const cookies = parseCookies(ctx);
    const token = cookies['@arbocontrol:token'];

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    // Verificação da permissão do usuário para acessar a página
    if(options) {
      const user = decode<{ permissions: string[], roles: string[] }>(token);
      const { permissions, roles } = options;
  
      const userHasValidPermissions = validateUserPermissions({
        user,
        permissions,
        roles,
      })

      if(!userHasValidPermissions) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false,
          }
        }
      }
    }



    // try catch para prevenir o erro de tentativa de redirecionamento ocorrendo
    // pelo lado do servidor
    try {
      return await fn(ctx);
    } catch(err) {
      if(err instanceof AuthTokenError) {
        destroyCookie(ctx, '@arbocontrol:token');
        destroyCookie(ctx, '@arbocontrol:refreshToken');
  
        return {
          redirect: {
            destination: '/',
            permanent: false,
          }
        }
      }
    }
  }
}