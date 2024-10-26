import { useState, useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface AuthStatus {
  isAuthenticated: boolean;
  isVisitor: boolean;
  isTokenExpired: boolean;
}

const useAuthStatus = (): AuthStatus => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    isAuthenticated: false,
    isVisitor: true,
    isTokenExpired: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        const exp = decodedToken.exp ? decodedToken.exp * 1000 : 0;

        if (Date.now() > exp) {
          // Token expiré
          setAuthStatus({
            isAuthenticated: false,
            isVisitor: false,
            isTokenExpired: true,
          });
        } else {
          // Token valide
          setAuthStatus({
            isAuthenticated: true,
            isVisitor: false,
            isTokenExpired: false,
          });
        }
      } catch (error) {
        console.log("error:", error);
        // En cas de token non décodable, on le considère comme invalide
        setAuthStatus({
          isAuthenticated: false,
          isVisitor: true,
          isTokenExpired: false,
        });
      }
    } else {
      // Aucun token trouvé
      setAuthStatus({
        isAuthenticated: false,
        isVisitor: true,
        isTokenExpired: false,
      });
    }
  }, []);

  return authStatus;
};

export default useAuthStatus;
