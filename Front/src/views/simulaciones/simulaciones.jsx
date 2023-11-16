import React from "react";
import { getAllSimulations } from "../../repositories/simulations";
import useSWR from "swr";

const Simulaciones = () => {
    const { data: simulations, error } = useSWR("simulations", {
        fetcher: getAllSimulations,
        initialData: [],
        revalidateOnMount: true,
    });
    
    return (
        <div className="container">
          {simulations ? (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Monto Total</th>
                  <th>Fecha de inicio</th>
                  <th>Fecha de término</th>
                </tr>
              </thead>
              <tbody>
                {simulations.map(simulation => (
                  <tr key={simulation.id}>
                    <td>{simulation.id}</td>
                    <td>{simulation.totalAmount}</td>
                    <td>{simulation.startDate}</td>
                    <td>{simulation.endDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Cargando simulaciones</p>
          )}
        </div>
      );
}

export default Simulaciones;