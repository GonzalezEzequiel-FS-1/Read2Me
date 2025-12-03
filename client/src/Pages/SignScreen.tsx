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

  const checkPasswordsMatch = () => {
    if (confirmPass !== password) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

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
        const matches = checkPasswordsMatch();
        if (!matches) return; // stop if passwords don't match

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
      // Narrow unknown to check for common error shapes (object with code or message) or a string
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
        <TextInput
          label="Confirm Password"
          type="password"
          value={confirmPass}
          onChange={(e: { target: { value: SetStateAction<string> } }) => {
            setError("");
            setConfirmPass(e.target.value);
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
