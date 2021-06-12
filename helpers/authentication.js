'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAlumno = exports.isDocente = exports.isAdmin = exports.isAuthenticated = exports.generatetoken = void 0;
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const moment_1 = __importDefault(require("moment"));
const usuariohelper_1 = require("./usuariohelper");
const secretToken = "K6AADGdTEObL98qQfu0uM32";
const generatetoken = (usuario) => {
    const payload = {
        sub: usuario.usuario,
        rol: usuario.tipoUsuario,
        iat: moment_1.default().unix()
    };
    return jwt_simple_1.default.encode(payload, secretToken);
};
exports.generatetoken = generatetoken;
const isAuthenticated = (req, res, next) => {
    let payload;
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "Not Authenticated!!", status: 403 });
    }
    else {
        //let token = req.headers.authorization.replace(/['"]+/g, '');
        //  try {
        //   payload = jwt.decode(token, secretToken);
        //  if (payload.exp <= moment().unix()) {
        //     return res.status(401).send({ message: "token is expired!!", status: 401 });
        //   }
        //} catch (error) {
        //  return res.status(404).send({ message: "Invalid token!!", status: 404 });
        //   }
        next();
    }
};
exports.isAuthenticated = isAuthenticated;
const isAdmin = (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.replace(/['"]+/g, '');
        let payload = jwt_simple_1.default.decode(token, secretToken);
        if (usuariohelper_1.isAdminisF(payload.rol)) {
            next();
        }
        else {
            res.status(403).send({ msg: "Not Authorized!! " });
        }
    }
    else {
        res.status(404).send({ msg: "Invalid token!! " });
    }
};
exports.isAdmin = isAdmin;
const isDocente = (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.replace(/['"]+/g, '');
        let payload = jwt_simple_1.default.decode(token, secretToken);
        if (usuariohelper_1.isDocenteF(payload.rol)) {
            next();
        }
        else {
            res.status(403).send({ msg: "Not Authorized!! " });
        }
    }
    else {
        res.status(404).send({ msg: "Invalid token!! " });
    }
};
exports.isDocente = isDocente;
const isAlumno = (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.replace(/['"]+/g, '');
        let payload = jwt_simple_1.default.decode(token, secretToken);
        if (usuariohelper_1.isAlumnoF(payload.rol)) {
            next();
        }
        else {
            res.status(403).send({ msg: "Not Authorized!! " });
        }
    }
    else {
        res.status(404).send({ msg: "Invalid token!! " });
    }
};
exports.isAlumno = isAlumno;
