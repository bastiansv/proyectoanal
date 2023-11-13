import UserController from './UserController.js';
import SimulationController from './SimulationController.js';
import LoginController from './LoginController.js';
const verifySign = require("./verifyToken.js");

export default (app) => {
	const userController = new UserController();
	const simulationController = new SimulationController();
	const loginController = new LoginController();

	app.get('/users', userController.getAll);
	app.post('/users', userController.create);
	app.get('/users/:userId', userController.get);
	app.put('/users/:userId', userController.update);
	app.delete('/users/:userId', userController.delete);

  	app.get('/simulations', simulationController.getAllSimulations);
  	app.post('/simulations', simulationController.createSimulation);
  	app.get('/simulations/:id', simulationController.getSimulationById);
  	app.put('/simulations/:id', simulationController.updateSimulation);
  	app.delete('/simulations/:id', simulationController.deleteSimulation);

	app.post("/login", loginController.login);
};