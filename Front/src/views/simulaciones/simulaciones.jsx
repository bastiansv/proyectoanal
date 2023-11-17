import React, { useState } from "react";
import { getAllSimulations } from "../../repositories/simulations";
import useSWR from "swr";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation,useHistory} from "react-router-dom";


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
        <Link to={`/menu-principal/?userId=${userid}`}>
          	<button className="btn btn-primary">Volver al Menu Principal</button>
        </Link>
        </div>
      );
}

export default Simulaciones;