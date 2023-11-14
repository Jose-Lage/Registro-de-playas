import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <section>
      <h1>Direccion no encontrada</h1>
      <Link to="/">Volver al inicio</Link>
    </section>
  );
};
