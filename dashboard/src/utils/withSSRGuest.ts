import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

// ? Higher-order-function => programação funcional
// ? recebe uma função como argumento ou retorna uma função como resultado
export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    // Quando estamos requisitando o cookie na camada de servidor, é necessário
    // passar o contexto (ctx) como primeiro parâmetro
    const cookies = parseCookies(ctx);

    if (cookies["@arbocontrol:token"]) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  }
}