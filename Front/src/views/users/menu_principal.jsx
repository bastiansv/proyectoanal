import React from "react";
import { useLocation } from "react-router-dom";

const MenuPrincipal = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userId = params.get("userId");
  return (
    <div className="container mt-4">
      <h2>Bienvenido, usuario {userId}</h2>
      {/* Resto del contenido del menú principal */}
      {/* Puedes agregar enlaces u otras opciones aquí */}
    </div>
  );
};

export default MenuPrincipal;
