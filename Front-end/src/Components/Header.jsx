import { useContext } from "react";
import { Link } from "react-router-dom";

import { Autentificacion } from "./Autentificacion";
import { AuthContext } from "../Context/AuthContext";

export const Header = () => {
  const { usuario } = useContext(AuthContext);
  return (
    <header>
      <h1>
        <Link to="/">{usuario ? `Bienvenid@ ${usuario}` : `Bienvenid@`}</Link>
      </h1>

      <Autentificacion />
    </header>
  );
};
