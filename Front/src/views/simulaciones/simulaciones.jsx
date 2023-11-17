import React, { useState } from "react";
import { getAllSimulations } from "../../repositories/simulations";
import useSWR from "swr";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation, useHistory } from "react-router-dom";

const Simulaciones = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userid = params.get("userId");

  const history = useHistory();
  const [state, setstate] = useState({
    userId: userid, // Asignar userId directamente al estado al inicio
  });

  const { data: simulations, error } = useSWR("simulations", {
    fetcher: getAllSimulations,
    initialData: [],
    revalidateOnMount: true,
  });

  const handleSimulationDetail = (simulationId) => {
    // Redirigir a la página de detalle de simulación con el ID correspondiente
    history.push(`/detalle-simulacion/?userId=${userid}&simulationId=${simulationId}`);
  };

  return (
    <div className="container">
      {simulations ? (
        <table className="table">
          <thead>
            <tr>
              <th>RUT Cliente</th>
              <th>Monto Total</th>
              <th>Fecha de inicio</th>
              <th>Fecha de término</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {simulations.map((simulation) => (
              <tr key={simulation.id}>
                <td>{simulation.userRut}</td>
                <td>{simulation.totalAmount}</td>
                <td>{simulation.startDate}</td>
                <td>{simulation.endDate}</td>
                <td>
                  {/* Agregar botón que redirige a la página de detalle de simulación */}
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleSimulationDetail(simulation.id)}
                  >
                    Ver Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Cargando simulaciones</p>
      )}
      <Link to={`/menu-principal/?userId=${userid}`}>
        <button className="btn btn-primary">Volver al Menu Principal</button>
      </Link>
    </div>
  );
};

export default Simulaciones;
