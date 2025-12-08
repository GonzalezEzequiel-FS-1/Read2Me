import React, { useState, useContext, useEffect, useCallback } from "react";
import { Space, ActionIcon, Text, Button, Anchor } from "@mantine/core";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { emailSign, resetPassword, socialSign } from "../utils/AuthUtil";
import { Logo } from "../Components/Logo";
import { TextInputField } from "../Components/InputFields/TextInputField";
import { PasswordInputField } from "../Components/InputFields/PasswordInputField";
import { AcceptBTN } from "../Components/Buttons/AcceptBTN";
import { FirebaseError } from "firebase/app";

export const Login = () => {
  const nav = useNavigate();
  const { error, setError, clearError, signOff } = useContext(AuthContext);

  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  const [userName, setUserName] = useState("");
  const [errorCounter, setErrorCounter] = useState(0);
  const [forgotNotification, setForgotNotification] = useState(false);

  const resetForm = useCallback(() => {
    setConfirmedPass("");
    clearError();
  }, [clearError]);

  const handleSignIn = async () => {
    const result = await emailSign(
      email,
      password,
      isSignIn ? undefined : confirmedPass,
      userName
    );

    if (result.success) {
      clearError();
      nav("/home");
      return;
    }

    setError(result.error || result.message);
    if (
      result.error === "Firebase: Error (auth/invalid-credential)." ||
      result.error === "Firebase: Error (auth/too-many-requests)."
    ) {
      setErrorCounter((prev) => prev + 1);
      setError("Invalid Password and Email Combination");
      if (errorCounter == 2) {
        setForgotNotification(true);
      }
      console.log(errorCounter);
    }
  };

  const handleSwapAuthMode = () => {
    setIsSignIn((prev) => !prev);
    resetForm();
    setErrorCounter(0);
    setForgotNotification(false);
    setError("");
  };

  useEffect(() => {
    clearError();
  }, [email, password, confirmedPass]);

  return (
    <div className="w-full max-w-[420px] px-4 text-center flex flex-col justify-between h-screen">
      <div className="h-full flex flex-col justify-center">
        <Logo />
        <div className="h-8">
          {error ? (
            <Text c="Red" fw={700}>
              {error}
            </Text>
          ) : (
            <Space mt="xl" />
          )}
        </div>

        <div className="flex flex-col">
          <TextInputField
            placeholder="Type your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isSignIn && (
            <>
              <Space mt="xl" />
              <TextInputField
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Create a User Name"
              />
            </>
          )}

          <Space mt="xl" />

          <PasswordInputField
            value={password}
            placeholder="Type your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isSignIn && (
            <>
              <Space mt={"xl"} />
              <PasswordInputField
                value={confirmedPass}
                onChange={(e) => setConfirmedPass(e.target.value)}
                placeholder="Confirm Your Password"
              />
            </>
          )}
          <div className="h-10 m-auto flex items-center">
            {isSignIn && forgotNotification ? (
              <Text c={"Red"}>
                Did you forgot your password?{" "}
                <Button
                  onClick={async () => {
                    const result = await resetPassword(email);
                    if (result.success) {
                      alert(result.message);
                    } else {
                      alert(result.message || "Unable to send reset email");
                    }
                  }}
                  variant="transparent"
                >
                  Reset it here
                </Button>
              </Text>
            ) : (
              <></>
            )}
          </div>
        </div>

        <AcceptBTN
          onClick={handleSignIn}
          buttonText={isSignIn ? "Sign In" : "Sign Up"}
        />

        <Space mt="xl" />

        <Text>Or Sign {isSignIn ? "In" : "Up"} with:</Text>

        <Space mt="md" />

        <div className="w-full flex items-center justify-around">
          <ActionIcon
            onClick={() => socialSign("GitHub")}
            variant="transparent"
            size="xl"
          >
            <FaGithub className="w-full h-auto" />
          </ActionIcon>

          <ActionIcon
            onClick={() => socialSign("Google")}
            variant="transparent"
            size="xl"
          >
            <FaGoogle className="w-full h-auto" />
          </ActionIcon>
        </div>
      </div>

      <div className="w-full text-center">
        <Text>
          {isSignIn ? "Don't Have an Account?" : "Already have an Account?"}
          <span
            className="text-blue-300 font-bold cursor-pointer"
            onClick={handleSwapAuthMode}
          >
            {isSignIn ? " Sign Up" : " Sign In"}
          </span>
        </Text>

        <Space mt="md" />
      </div>
    </div>
  );
};
