import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../ContextDeclaration/AuthContext";
import { auth } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const nav = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? currentUser : null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login  with google function
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      nav("/home");
    } catch (err) {
      console.error("Google login failed:", err);
      throw err;
    }
  };

  // Login with Email and Password
  const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (err) {
      console.error("Email login failed:", err);
      throw err;
    }
  };
  // Logout function
  const appSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      nav("/");
    } catch (err) {
      console.error("Logout failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(result.user); // Update context with the newly created user
    } catch (err) {
      console.error("Email registration failed:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        appSignOut,
        loginWithEmailAndPassword,
        registerWithEmailAndPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
