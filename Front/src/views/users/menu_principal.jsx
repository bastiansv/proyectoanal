import React from "react";
import { useLocation,Link } from "react-router-dom";

const MenuPrincipal = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userId = params.get("userId");
  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '80vh'}}>
      <div style={{padding: "100px"}}>
        <Link to={`/nueva-ficha/?userId=${userId}`}>
          <button className="btn btn-primary">Nueva ficha de solicitud de préstamo</button>
        </Link>
      </div>
      <div style={{padding: "100px"}}>  
        <Link to={`/simulaciones/?userId=${userId}`}>
          <button className="btn btn-primary">Ver simulaciones realizadas</button>
        </Link>
      </div>
      {/* Resto del contenido del menú principal */}
      {/* Puedes agregar enlaces u otras opciones aquí */}
    </div>
  );
};

export default MenuPrincipal;
