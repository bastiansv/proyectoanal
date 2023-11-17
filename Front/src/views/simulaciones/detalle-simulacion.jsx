import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getAllSimulations, getSimulationById } from "../../repositories/simulations";
import useSWR from "swr";

export default function Detalle() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userId = params.get("userId");
  const simulationId = params.get("simulationId");

  const { data: simulations, error } = useSWR("simulations", {
    fetcher: getAllSimulations,
    initialData: [],
    revalidateOnMount: true,
  });

  // Obtén la simulación específica por ID
  const simulation = simulations.find((sim) => sim.id.toString() === simulationId);

  // Función para obtener las fechas de vencimiento
  const getFechasVencimiento = () => {
    const fechasVencimiento = [];
    
    // Verifica si simulation está definido
    if (!simulation) {
        return fechasVencimiento;
        }
  
        const fechaInicio = new Date(simulation.startDate);
        const fechaFin = new Date(simulation.endDate);    
  
    while (fechaInicio <= fechaFin) {
      // Agrega el día 30 de cada mes
      fechasVencimiento.push(new Date(fechaInicio));
      fechaInicio.setMonth(fechaInicio.getMonth() + 1);
      fechaInicio.setDate(30);
    }
  
    return fechasVencimiento;
  };
  

  // Calcula el monto por cuota
const fechasVencimiento = getFechasVencimiento();
const montoPorCuota = simulation ? simulation.totalAmount / fechasVencimiento.length : 0;

return (
  <div className="container mt-4">
    {simulation ? (
      <div>
        <h2>Detalles de la Simulación</h2>
        <table className="table">
          <thead>
            <tr>
              <th>N° de Cuota</th>
              <th>Fecha de Vencimiento</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {fechasVencimiento.map((fecha, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{fecha.toLocaleDateString()}</td>
                <td>{montoPorCuota}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={`/menu-principal/?userId=${userId}`}>
          <button className="btn btn-primary">Volver al Menú Principal</button>
        </Link>
      </div>
    ) : (
      <p>Cargando detalles de la simulación...</p>
    )}
  </div>
);

}


