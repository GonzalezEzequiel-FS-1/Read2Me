import { useContext, useState, useEffect, type SetStateAction } from "react";
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
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);

  // Check if passwords match when signing up
  useEffect(() => {
    if (isSignUp) {
      if (confirmPass && password !== confirmPass) {
        setError("Passwords do not match");
        setPasswordsMatch(false);
      } else {
        setError("");
        setPasswordsMatch(true);
      }
    } else {
      setPasswordsMatch(true); // always true when signing in
    }
  }, [password, confirmPass, isSignUp]);

  // Redirect if user is already logged in
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

    if (isSignUp && !passwordsMatch) {
      setError("Passwords do not match");
      return;
    }

    try {
      if (isSignUp) {
        await registerWithEmailAndPassword(email, password);
      } else {
        await loginWithEmailAndPassword(email, password);
      }
      navigate("/home");
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "code" in err) {
        const maybeErr = err as { code?: string; message?: string };
        setError(maybeErr.code || maybeErr.message || "Something went wrong");
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("Something went wrong");
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await loginWithGoogle();
      navigate("/home");
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "code" in err) {
        const maybeErr = err as { code?: string; message?: string };
        setError(maybeErr.code || maybeErr.message || "Something went wrong");
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("Something went wrong");
      }
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
          onChange={(e: { target: { value: SetStateAction<string> } }) => {
            setError("");
            setEmail(e.target.value);
          }}
        />
        <TextInput
          label="Password"
          type="password"
          value={password}
          onChange={(e: { target: { value: SetStateAction<string> } }) => {
            setError("");
            setPassword(e.target.value);
          }}
        />

        {isSignUp && (
          <TextInput
            label="Confirm Password"
            type="password"
            value={confirmPass}
            onChange={(e: { target: { value: SetStateAction<string> } }) => {
              setError("");
              setConfirmPass(e.target.value);
            }}
          />
        )}

        <Button
          disabled={isSignUp ? !passwordsMatch : false}
          onClick={handleEmailAuth}
        >
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
