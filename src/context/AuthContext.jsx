import { createContext, useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const tokens = localStorage.getItem("authTokens");
    return tokens ? jwtDecode(JSON.parse(tokens).access) : null;
  });

  const [authTokens, setAuthTokens] = useState(() => {
    const tokens = localStorage.getItem("authTokens");
    return tokens ? JSON.parse(tokens) : null;
  });

  const [loading, setLoading] = useState(true);
  const [tokenRefreshed, setTokenRefreshed] = useState(false); 
  const navigate = useNavigate();

  const loginUser = useCallback(
    async (event) => {
      try {
        event.preventDefault();
        const response = await fetch(`${API_URL}/auths/login/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: event.target.username.value,
            password: event.target.password.value,
          }),
        });
        const data = await response.json();
        if (response.status === 200) {
          setAuthTokens(data);
          setUser(jwtDecode(data.access));
          localStorage.setItem("authTokens", JSON.stringify(data));
          alert("Logging in");
          navigate("/dashboard");
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        console.error(error);
      }
    },
    [navigate]
  );

  const logoutUser = useCallback(() => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  }, [navigate]);

  const updateToken = useCallback(async () => {
    if (!authTokens) {
      setLoading(false); 
      setTokenRefreshed(true);
      return;
    }
    try {
      const response = await fetch(`${API_URL}/auths/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: authTokens?.refresh }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        console.log("Refresh token succeeded:", data);
      } else {
        logoutUser();
      }
    } catch (error) {
      console.error(error);
      logoutUser();
    } finally {
      setLoading(false);
      setTokenRefreshed(true); 
    }
  }, [authTokens, logoutUser]);

  const registerUser = useCallback(
    async (event) => {
      try {
        event.preventDefault();
        await fetch(`${API_URL}/auths/register/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: event.target.username.value,
            password: event.target.password.value,
            email: event.target.email.value,
            first_name: event.target.first_name.value,
            last_name: event.target.last_name.value,
          }),
        });
        navigate("/login");
        alert("User has been registered");
      } catch (error) {
        console.error(error);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    const interval = setInterval(() => {
      if (authTokens) {
        updateToken(); 
      }
    }, 240000); 

    return () => clearInterval(interval);
  }, [authTokens, loading, updateToken]);

  if (loading || !tokenRefreshed) {
    return <div>Loading...</div>; 
  }

  let contextData = {
    loginUser,
    logoutUser,
    authTokens,
    user,
    registerUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
