import User from '../models/User.js';

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
