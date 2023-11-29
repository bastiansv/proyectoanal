import User from '../models/User.js';

export default class{
    async login(req, res) {
        console.log("recibi "+req.body.email+" y "+req.body.password);
        const logeo = await User.findOne({
            where:{
                email: req.body.email,
                password: req.body.password
            },
        });
        res.status(200).json({id: logeo.id,email: logeo.email});
      }
      
    async get(req, res) {
		const user = await User.findByPk(req.params.userId);
		res.send(user);
	}
    
}
