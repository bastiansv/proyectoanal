import React, { useState } from "react";
import { getAllSimulations, getAllSimulationsbyId, getSimulationsbyUserId } from "../../repositories/simulations";
import useSWR from "swr";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation, useHistory } from "react-router-dom";

const Simulaciones = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userId = params.get("userId");

  const history = useHistory();
  const [state, setstate] = useState({
    userId: userId, // Asignar userId directamente al estado al inicio
  });

  // Verificar si userid tiene un valor antes de llamar a useSWR
  if (!userId) {
    // Puedes manejar este caso, por ejemplo, redirigiendo a otra página
    return <p>No se proporcionó el ID del usuario.</p>;
  }

  const { data: simulations, error, mutate } = useSWR("simulations", {
    fetcher: () => getSimulationsbyUserId({userId:userId}),
    initialData: [],
    revalidateOnMount: true,
  });


  const handleSimulationDetail = (simulationId) => {
    // Redirigir a la página de detalle de simulación con el ID correspondiente
    history.push(`/detalle-simulacion/?userId=${userId}&simulationId=${simulationId}`);
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
                <td>{Math.floor(simulation.totalAmount)}</td>
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
      <Link to={`/menu-principal/?userId=${userId}`}>
        <button className="btn btn-primary">Volver al Menu Principal</button>
      </Link>
    </div>
  );
};

export default Simulaciones;
