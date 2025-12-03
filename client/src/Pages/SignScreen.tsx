import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/ContextDeclaration/AuthContext";
import { Button, Container, Stack, Typography } from "@mui/material";
import { TextInput } from "../components/TextInput";

export const SignScreen = () => {
  const {
    user,
    loginWithGoogle,
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
    loading,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Automatically redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      if (isSignUp) {
        await registerWithEmailAndPassword(email, password);
      } else {
        await loginWithEmailAndPassword(email, password);
      }
      navigate("/home");
    } catch (err: any) {
      setError(err.code || "Something went wrong");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await loginWithGoogle();
      navigate("/home");
    } catch (err: any) {
      setError(err.code || "Something went wrong");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container
      sx={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Stack sx={{ textAlign: "center", gap: "1rem", width: "300px" }}>
        <Typography variant="h3">Read2Me</Typography>
        <Typography variant="h6">{isSignUp ? "Sign Up" : "Sign In"}</Typography>

        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}

        <TextInput
          label="Email"
          value={email}
          onChange={(e) => {
            setError("");
            setEmail(e.target.value);
          }}
        />
        <TextInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setError("");
            setPassword(e.target.value);
          }}
        />

        <Button onClick={handleEmailAuth}>
          {isSignUp ? "Register" : "Login"}
        </Button>
        <Button onClick={handleGoogleLogin}>
          {isSignUp ? "Sign Up with Google" : "Sign In with Google"}
        </Button>

        <Button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Button>
      </Stack>
    </Container>
  );
};
