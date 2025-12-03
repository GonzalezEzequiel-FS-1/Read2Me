import { createContext } from "react";
import type { User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  appSignOut: () => Promise<void>;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  registerWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  loginWithGoogle: async () => {},
  appSignOut: async () => {},
  loginWithEmailAndPassword: async () => {},
  registerWithEmailAndPassword: async () => {},
});
