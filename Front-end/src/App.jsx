import "./app.css";

import { Routes, Route } from "react-router-dom";
import "./app.css";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";

import { Inicio } from "./Paginas/Inicio";
import { Registro } from "./Paginas/Registro";
import { Login } from "./Paginas/Login";
import { NotFound } from "./Paginas/NotFound";
import { FormularioNuevaOpinion } from "./Paginas/CrearOpinion";
import { ActualizarPerfil } from "./Paginas/ActualizarPerfil";

function App() {
  return (
    <>
      <Header />
      <main className="app">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<ActualizarPerfil />} />
          <Route path="/opiniones" element={<FormularioNuevaOpinion />} />
          <Route path="/opiniones/:id" element={<h1>Opinion unica</h1>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
