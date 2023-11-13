import { JsonWebTokenError } from 'jsonwebtoken';
import User from '../models/User.js';
const jwt = require("jsonwebtoken");

export default class LoginController {
    async login(req, res) {
        const user = await User.findOne({
            where: {
                password: req.body.password,
            },
        });
        const token = jwt.sign({ id:user.id }, process.env.SECRET_TOKEN);
        if (!user) {
            return res.status(400).send("contraseña incorrecta");
        } else {
            return res.header("auth-token", token).send("Estas logeado");
        }
    }
};
