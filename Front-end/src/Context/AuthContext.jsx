import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(""); //localStorage.getItem("token")
  const [id, setId] = useState(null);
  const [usuario, setUsuario] = useState("");
  const [guardarEmail, setGuardarEmail] = useState("");
  const [fecha, setFecha] = useState("");

  /*useEffect(() => {
    localStorage.setItem("Token", token);
  }, [token])*/

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        id,
        setId,
        usuario,
        setUsuario,
        guardarEmail,
        setGuardarEmail,
        fecha,
        setFecha,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
