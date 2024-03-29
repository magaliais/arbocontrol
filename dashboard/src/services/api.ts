import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from 'nookies';
import { signOut } from "../contexts/AuthContext";
import { AuthTokenError } from "./errors/AuthTokenError";

let isRefreshing = false;
let failedRequestsQueue = [];

// * setupAPIClient será chamada quando for usada no lado do servidor
export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  interface AxiosErrorResponse {
    code?: string;
  }

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      // Caso seja a primeira vez e o usuário não esteja logado, o valor será undefined.
      // Por isso, no AuthContext, é necessário atualizar o token do header quando o
      // usuário realizar o login
      Authorization: `Bearer: ${cookies["nextauth.token"]}`,
    },
  });

  // ? Processo de refreshToken (intercepta resposta da requisição, cria fila de
  // ? requisições enquanto o processo de refresh está acontecendo e resolve as
  // ? requisições não realizadas depois)
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError<AxiosErrorResponse>) => {
      if (error.response.status === 401) {
        if (error.response.data.code === "token.expired") {
          // renovar o token

          // atualiza os cookies
          cookies = parseCookies(ctx);

          const { "nextauth.refreshToken": refreshToken } = cookies;

          // Obtém todas as configurações da requisição
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            api
              .post("/refresh", {
                refreshToken,
              })
              .then((response) => {
                const { token } = response.data;

                // atualiza o token e o refreshToken
                setCookie(ctx, "nextauth.token", token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: "/",
                });

                setCookie(
                  ctx,
                  "nextauth.refreshToken",
                  response.data.refreshToken,
                  {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: "/",
                  }
                );

                // atualiza também o header geral com o novo token
                api.defaults.headers["Authorization"] = `Bearer ${token}`;

                failedRequestsQueue.forEach((request) =>
                  request.onSuccess(token)
                );
                failedRequestsQueue = [];
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) =>
                  request.onFailure(err)
                );
                failedRequestsQueue = [];

                if (process.browser) {
                  signOut();
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          // Responsável por criar a fila de requisições que não foram feitas
          // por que o token estava sendo atualizado
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers["Authorization"] = `Bearer ${token}`;

                resolve(api(originalConfig));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        } else {
          // deslogar o usuário
          if (process.browser) {
            signOut();
          } else {
            return Promise.reject(new AuthTokenError())
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}