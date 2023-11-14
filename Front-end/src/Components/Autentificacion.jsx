import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export const Autentificacion = () => {
  const { token } = useContext(AuthContext);

  const CerrarSesion = () => {};
  return (
    <nav>
      {token ? (
        <>
          <Link to="/opiniones">
            <li>Crear opinión</li>
          </Link>
          <Link to="/user">
            <li>ver perfil</li>
          </Link>
        </>
      ) : (
        <>
          <Link to="/registro">
            <li>Registro</li>
          </Link>
          <Link to="/login">
            <li>Login</li>
          </Link>
        </>
      )}
    </nav>
  );
};
