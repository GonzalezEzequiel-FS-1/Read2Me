import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
const auth = getAuth();

const checkPasswordMatch = async (password, confirmPass) => ({
  success: password === confirmPass,
  message:
    password === confirmPass ? "Passwords Match" : "Passwords did not match",
});

const resetPassword = async (email) => {
  if (!email) {
    return {
      success: false,
      message: "User Email not received",
    };
  }
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: "Password reset email sent.",
    };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const emailSign = async (email, password, confirmPass, userName) => {
  // SIGN UP logic runs only if confirmPass is provided (not empty)
  const isSignUp = typeof confirmPass === "string" && confirmPass.length > 0;

  // If confirmPass was provided but empty
  if (confirmPass === "") {
    return {
      success: false,
      message: "Please confirm your password",
    };
  }

  // SIGN UP FLOW
  if (isSignUp) {
    // Check password match
    const passMatch = await checkPasswordMatch(password, confirmPass);
    if (!passMatch.success) return passMatch;

    try {
      const signUp = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Safe: updateProfile AFTER firebase sets currentUser
      await updateProfile(auth.currentUser, {
        displayName: userName || "",
      });

      return {
        success: true,
        message: `User ${email} successfully signed up`,
      };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  // SIGN IN FLOW
  try {
    const signIn = await signInWithEmailAndPassword(auth, email, password);

    return {
      success: true,
      message: `User ${email} successfully signed in`,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
};

const socialSign = async (providerID) => {
  if (providerID === "" || !providerID) {
    return {
      success: false,
      message: "No Provider ID Received",
    };
  }
  if (providerID !== "GitHub" && providerID !== "Google") {
    return {
      success: false,
      message: "Unsupported Provider",
    };
  }
  let provider;
  if (providerID === "Google") {
    provider = new GoogleAuthProvider();
  } else if (providerID === "GitHub") {
    provider = new GithubAuthProvider();
  }
  try {
    const popSign = await signInWithPopup(auth, provider);
    if (popSign) {
      return { success: true, message: "User Authenticated Successfully" };
    }
  } catch (err) {
    return {
      success: false,
      message: "Error caught during authentication",
      error: err.message,
    };
  }
};

export { emailSign, checkPasswordMatch, socialSign, resetPassword };
