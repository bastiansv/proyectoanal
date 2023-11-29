import React, { useState, useEffect } from "react";
import { getAllSimulations } from "../../repositories/simulations";
import useSWR from "swr";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation, useHistory } from "react-router-dom";
import { Bar  } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale,BarElement, Tooltip, Legend, LinearScale} from 'chart.js';

const MenuAnalista = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userId = params.get("userId");

  const history = useHistory();
  const [state, setstate] = useState({
    userId: userId,
  });

  ChartJS.register(
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
  );

  if (!userId) {
    return <p>No se proporcionó el ID del usuario.</p>;
  }

  const { data: simulations, error, mutate } = useSWR("simulations", {
    fetcher: () => getAllSimulations(),
    initialData: [],
    revalidateOnMount: true,
  });

  // Filtrar simulaciones por userId y contar la cantidad por cada gerente
  const gerenteSimulationsCount = {};
  simulations?.forEach((simulation) => {
    const gerenteId = simulation.userId;
    gerenteSimulationsCount[gerenteId] = gerenteSimulationsCount[gerenteId]
      ? gerenteSimulationsCount[gerenteId] + 1
      : 1;
  });

  // Convertir datos para el gráfico de barras
  const chartData = {
    labels: Object.keys(gerenteSimulationsCount),
    datasets: [
      {
        label: "Simulaciones por Gerente",
        data: Object.values(gerenteSimulationsCount),
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };  

  // Configuración del gráfico de barras
  const chartOptions = {
    type: 'bar',
    data: chartData,
    options: {
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'ID del Gerente'
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Cantidad de Simulaciones'
          },
          ticks: {
            beginAtZero: true
          }
        }]
      }
    },
  };

  return (
    <div className="container">
      <div style={{margin:"10px"}}> 
        <h2> Últimas simulaciones </h2>
      </div>
      
      {simulations ? (
        <div style={{ maxHeight: "400px", overflowY: "auto"}}>
          <table className="table">
            <thead>
              <tr>
                <th>ID Gerente</th>
                <th>Monto Total en CLP</th>
                <th>Fecha de inicio</th>
                <th>Fecha de término</th>
              </tr>
            </thead>
            <tbody>
              {simulations.map((simulation) => (
                <tr key={simulation.id}>
                  <td>{simulation.userId}</td>
                  <td>{Math.floor(simulation.totalAmount)}</td>
                  <td>{simulation.startDate}</td>
                  <td>{simulation.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Cargando simulaciones</p>
      )}

      {/* Gráfico de barras */}
      

      
      <div style={{ marginTop: "20px" }}>
        <div style={{margin:"10px"}}> 
          <h2> Simulaciones por Ejecutivo </h2>
        </div>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default MenuAnalista;


