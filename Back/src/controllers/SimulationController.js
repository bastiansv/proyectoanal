import Simulation from '../models/Simulation.js';
import axios from 'axios';

export default class SimulationController {
  async getAllSimulations(req, res) {
    try {
      const simulations = await Simulation.findAll();
      res.send(simulations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las simulaciones' });
    }
  }

  async getSimulationById(req, res) {
    try {
      const simulation = await Simulation.findByPk(req.params.id);
      if (!simulation) {
        res.status(404).json({ error: 'Simulación no encontrada' });
        return;
      }
      res.send(simulation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la simulación' });
    }
  }

  async getSimulationsByUserId(req, res) {
    try {
      
      const userId = req.body.userId;
      console.log(userId);
  
      // Buscar todas las simulaciones que coincidan con el userId
      const simulations = await Simulation.findAll({
        where: { userId: userId },
      });
  
      if (!simulations || simulations.length === 0) {
        res.status(404).json({ error: 'Simulaciones no encontradas para el usuario' });
        return;
      }
  
      res.send(simulations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las simulaciones' });
    }
  }  

  async createSimulation(req, res) {
    try {
      // Obtener el valor de la UF desde la API externa
      const ufApiResponse = await axios.get('https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=40aed7af8daabc8bdcf30f283916c2413e4e6099&formato=json');
      let ufValue = ufApiResponse.data.UFs[0].Valor;
  
      // Verificar si ufValue es un número y convertirlo a cadena si es necesario
      if (typeof ufValue === 'number') {
        ufValue = ufValue.toString();
      }
  
      // Realizar el reemplazo si ufValue es una cadena
      if (typeof ufValue === 'string') {
        ufValue = ufValue.replace('.', '');
        ufValue = ufValue.replace(',', '.');
        // Convertir la cadena resultante a un valor numérico
        ufValue = parseFloat(ufValue);
      }
  
      // Crear la simulación con el valor de la UF
      const simulation = await Simulation.create({
        ...req.body,
        ufValueAtCreation: ufValue, // Ajusta el nombre del campo según tu modelo
      });
  
      res.status(201).json(simulation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la simulación' });
    }
  }
  

  async updateSimulation(req, res) {
    try {
      const simulation = await Simulation.findByPk(req.params.id);
      if (!simulation) {
        res.status(404).json({ error: 'Simulación no encontrada' });
        return;
      }
      await simulation.update(req.body);
      res.send(simulation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar la simulación' });
    }
  }

  async deleteSimulation(req, res) {
    try {
      const simulation = await Simulation.findByPk(req.params.id);
      if (!simulation) {
        res.status(404).json({ error: 'Simulación no encontrada' });
        return;
      }
      await simulation.destroy();
      res.send({ status: 'ok' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar la simulación' });
    }
  }
}


