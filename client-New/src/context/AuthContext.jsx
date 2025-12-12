// React imports for creating context, state, and lifecycle handling
import { createContext, useState, useEffect } from "react";

// Firebase auth listener that fires whenever the user's auth state changes
import { onAuthStateChanged, signOut } from "firebase/auth";

// Your initialized Firebase auth instance
import { auth } from "../../firebase";

// Create the authentication context
// This allows ANY component to access "user", "signOff", "error", etc.
// without passing props down manually.
export const AuthContext = createContext();

// Provider wraps your entire application so all children have access to this context
export const AuthProvider = ({ children }) => {
  // Stores the currently authenticated user (or null if logged out)
  const [user, setUser] = useState(null);

  const [userName, setUserName] = useState(null);

  // Stores the currently authenticated user's avatar (or null if logged out)
  const [avatar, setAvatar] = useState(null);

  // Stores the currently authenticated user's email (or null if logged out)
  const [email, setEmail] = useState(null);

  // Stores the currently authenticated user's email (or null if logged out)
  const [uid, setUID] = useState(null);

  // Used to delay UI from rendering until Firebase determines auth state
  // e.g., avoids flashing login screen when user is actually logged in
  const [loading, setLoading] = useState(true);

  // Stores any authentication-related errors (sign in, sign up, etc.)
  const [error, setError] = useState("");

  // Simple helper that clears the error string
  const clearError = () => setError("");

  // Logs the user out of Firebase
  const signOff = async () => {
    try {
      // Firebase signOut kills the session, clears tokens, and updates listeners
      await signOut(auth);

      // Return the result in a predictable structure
      return { success: true, error: null };
    } catch (err) {
      // If Firebase fails, return the error message so the UI can display it
      return { success: false, error: err.message };
    }
  };

  // Run once on mount — listens for Firebase user changes
  useEffect(() => {
    // Firebase fires this callback whenever:
    // - The app loads and checks local auth tokens
    // - User signs in
    // - User signs out
    // - User refreshes token in background
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Save the current user object (or null if logged out)
      if (currentUser) {
        setUser(currentUser);
        setAvatar(currentUser.photoURL);
        setEmail(currentUser.email);
        setUID(currentUser.uid);
        setUserName(currentUser.displayName);
      } else {
        setUser(null);
        setAvatar(null);
        setEmail(null);
        setUID(null);
        setUserName(null);
      }

      // Tell the app that auth checking is done
      setLoading(false);
    });

    // Cleanup function — stops listening when provider unmounts
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        // Expose ONLY what the app needs
        // This prevents components from messing with internal state
        user, // currently logged-in Firebase user
        loading, // used for gating protected routes
        error, // any login/signup error messages
        setError, // allow UI to set error text
        clearError, // allow UI to clear error text
        signOff, // logout function for profile/settings pages
        email,
        avatar,
        uid,
        userName,
      }}
    >
      {/* Everything inside AuthProvider gets access to the context */}
      {children}
    </AuthContext.Provider>
  );
};
