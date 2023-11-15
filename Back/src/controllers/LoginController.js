import User from '../models/User.js';

<<<<<<< Updated upstream
export default class LoginController {
    async login(req, res) {
        const user = await User.findOne({
            where: {
                password: req.body.password,
            },
        });
        if (!user) {
            return res.status(400).send("contraseña incorrecta");
        } else {
            return res.send("Estas logeado");
        }
    }
};
=======
export default class{
    async login(req, res) {
        console.log("recibi "+req.body.name+" y "+req.body.password);
        const logeo = await User.findOne({
            where:{
                name: req.body.name,
                password: req.body.password
            },
        });
        res.status(200).json({id: logeo.id});
      }
      
    async get(req, res) {
		const user = await User.findByPk(req.params.userId);
		res.send(user);
	}
    
}
>>>>>>> Stashed changes
