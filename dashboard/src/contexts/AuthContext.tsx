import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { api } from "../services/apiClient";

type User = {
  email: string;
  name: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

// ? Permite ao intellisense identificar quais informações podem ser buscadas de
// ? dentro do contexto
export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  destroyCookie(undefined, "@arbocontrol:token");
  destroyCookie(undefined, "@arbocontrol:refreshToken");

  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    // obtém todos os cookies salvos
    const { "@arbocontrol:token": token } = parseCookies();

    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { email, name } = response.data;

          setUser({ email, name });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { token, refreshToken, name } = response.data;


      // sessionStorage -> Não fica disponível em outras sessões. Fechar a janela
      // encerra uma sessão
      // localStorage -> Persiste, mas não consegue ser acessado pelo servidor
      // e usando Next isso pode ser um problema
      // cookies -> Pode ser acessado pelo lado do browser e do lado do servidor

      setCookie(undefined, "@arbocontrol:token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setCookie(undefined, "@arbocontrol:refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser({
        email,
        name
      });

      // atualiza o token de autorização do header das requisições
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook de context simplificado, para não precisar ficar importando useContext
// em todo arquivo
export const useAuth = () => useContext(AuthContext);