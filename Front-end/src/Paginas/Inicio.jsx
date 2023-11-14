import { useContext, useState } from "react";
import { UseOpiniones } from "../Hooks/UseOpiniones";
import { AuthContext } from "../Context/AuthContext";
import {
  borrarOpiniones,
  cargarOpinionesConLike,
  likeOpiniones,
} from "../Peticiones/Peticiones";

export const Inicio = () => {
  const { opiniones, setOpiniones, cargando, error } = UseOpiniones();
  const { token, id } = useContext(AuthContext);

  if (cargando) return <p>Cargando opiniones...</p>;
  if (error) return <p>{error}</p>;

  const darLike = async (e) => {
    e.preventDefault();
    const eventoId = +e.target.id;

    try {
      await likeOpiniones({ token, eventoId, id });
      const opinionesLogin = await cargarOpinionesConLike(token);
      setOpiniones(opinionesLogin);
    } catch (error) {
      console.log(error);
      //setError(error);
    }
    var elemento = e.target;
    elemento.classList.add("animado");
  };

  const borrarOpinion = async (e) => {
    const eventoId = +e.target.id;

    const confirmarEliminidao = confirm(`¿Estas seguro de borrar la opinion?`);

    if (confirmarEliminidao) {
      const nuevasOpiniones = opiniones.filter((opinion) => {
        return opinion.id !== eventoId;
      });

      setOpiniones(nuevasOpiniones);

      await borrarOpiniones(token, eventoId);
    }
  };

  return (
    <>
      <h2>Playas de Galicia</h2>
      <p className="text">
        En nuestro sitio, encontrarás un espacio dedicado a explorar y compartir
        experiencias sobre diferentes playas de Galicia. Creemos en la
        importancia de la comunidad y en el poder de las opiniones personales,
        por lo que nuestro objetivo es brindarte un lugar donde puedas descubrir
        y compartir tus impresiones sobre playas de todo tipo.
      </p>

      <img src="data:image/jpeg;base64,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" />
      <img src="data:image/jpeg;base64,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" />
      <img src="data:image/jpeg;base64,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" />

      <h2>Ultimas Opiniones</h2>
      {opiniones.map((opinion) => (
        <article className="noticia" key={opinion.id}>
          <h3>{opinion.titulo}</h3>
          <p>{opinion.text}</p>

          <p>Likes: {opinion.cantidad_likes}</p>
          <p>Fecha: {opinion.created_at}</p>
          <p>Opinión creada por: {opinion.user_name}</p>

          {token &&
            (!opinion.id_usuario_like ? (
              <p
                className="emogi-for-like"
                id={opinion.id}
                onClick={(e) => darLike(e)}
              >
                🤍
              </p>
            ) : (
              <p className="emogi-liked">❤️</p>
            ))}
          {id === opinion.user_id ? (
            <p
              className="boton-borrado"
              id={opinion.id}
              onClick={(e) => borrarOpinion(e)}
            >
              ❌
            </p>
          ) : null}
        </article>
      ))}
    </>
  );
};
