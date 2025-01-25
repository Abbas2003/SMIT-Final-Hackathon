import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AppRoutes } from "../routes/routes";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
//   const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const token = Cookies.get("token");
      
      if (token) {
        getUser();
      } 

    //   if(user && user.role == "admin") navigate("/admin-dashboard");
    //   if(user && user.role == "user") navigate("/user-dashboard");
    }
  }, [user]);

  const getUser = () => {
    axios
      .get(AppRoutes.getMyInfo, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log("response from get my info API=>", res.data);
        setUser(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}