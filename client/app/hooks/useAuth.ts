import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { login, logout } from "@/redux/slice/authSlice";

interface DecodedToken {
  id: number;
  email: string;
  role: string;
  exp: number;
}

const useAuth = () => {
  const dispatch = useDispatch();

  const handleAuthentication = (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      const user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };
      dispatch(login({ token, user }));
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  return { handleAuthentication, handleLogout };
};

export default useAuth;
