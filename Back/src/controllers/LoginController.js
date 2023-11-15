import User from '../models/User.js';

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
