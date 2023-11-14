import { useState, useContext } from "react";
import { NuevaOpinion } from "../Peticiones/Peticiones";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const FormularioNuevaOpinion = () => {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("Titulo para la opinion");
  const [texto, setTexto] = useState("Texto para la opinion");
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const data = await NuevaOpinion({ token, titulo, texto });
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <form onSubmit={handleForm}>
      <fieldset>
        <label htmlFor="tituloOpinion">Titulo Opinion</label>
        <input
          autoComplete="off"
          type="text"
          name="tituloOpinion"
          id="tituloOpinion"
          required
          placeholder={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <label htmlFor="textoOpinion">Texto de la Opinion</label>
        <textarea
          autoComplete="off"
          name="textoOpinion"
          id="textoOpinion"
          required
          placeholder={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
      </fieldset>
      <button>Enviar opinion</button>
      {error ? <p>{error.message}</p> : null}
    </form>
  );
};
