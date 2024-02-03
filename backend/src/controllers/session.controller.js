import { generateToken, authToken } from "../utils/jwt.js";
import { userModel } from "../dao/models/users.models.js";


const loginUsers = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send({ mensaje: "Usuario inválido" });
        }
 
        await userModel.findByIdAndUpdate(req.user._id, { last_connection: new Date() });
        const token = generateToken(req.user);
        res.status(200).send({ token });
    } catch (error) {
        console.error("Error en postLogin:", error);
        res.status(500).send({ mensaje: `Error al iniciar sesión ${error.message}` });
    }
}


const registerUsers = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).send({ mensaje: "Usuario ya existente" });
        }
        res.status(200).send({ mensaje: "Usuario registrado" });
    } catch (error) {
        res.status(500).send({ mensaje: `Error al registrar usuario ${error}` });
    }
};


const getGithub = async (req, res) => {
    res.status(200).send({ mensaje: "Usuario registrado" });
};


const getGithubCallback = async (req, res) => {
    req.session.user = req.user;
    res.status(200).send({ mensaje: "Usuario logueado" });
};


const getLogout = async (req, res) => {

    res.clearCookie("jwtCookie");
    res.status(200).send({ resultado: "Usuario deslogueado" });
};


const currentSession = (req, res) => {
    res.send(req.user)
}


export const sessionController = {
    loginUsers,
    registerUsers,
    getGithub,
    getGithubCallback,
    getLogout,
    currentSession
}