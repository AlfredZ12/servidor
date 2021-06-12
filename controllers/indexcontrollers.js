"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const administrador_1 = __importDefault(require("../models/administrador"));
const alumno_1 = __importDefault(require("../models/alumno"));
const docente_1 = __importDefault(require("../models/docente"));
const authentication_1 = require("../helpers/authentication");
const curso_1 = __importDefault(require("../models/curso"));
class indexcontroller {
    ingresar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const matricula = req.body.matricula;
            const contrasena = req.body.contrasena;
            console.log(matricula, contrasena);
            try {
                const sesion = yield usuario_1.default.findOne({
                    where: {
                        usuario: matricula,
                        contrasena: contrasena
                    }
                });
                const token = authentication_1.generatetoken(sesion);
                const idusuario = sesion === null || sesion === void 0 ? void 0 : sesion.getDataValue('idUsuario');
                const tipoUsuario = sesion === null || sesion === void 0 ? void 0 : sesion.getDataValue('tipoUsuario');
                console.log(idusuario, tipoUsuario);
                let tipo = tipoUsuario.toLocaleLowerCase();
                switch (tipo) {
                    case 'administrador':
                        const Administrador = yield administrador_1.default.findOne({
                            where: {
                                idUsuario: idusuario
                            }
                        });
                        res.send({ administrador: Administrador, usuario: sesion, token: token });
                        break;
                    case 'alumno':
                        const Alumno = yield alumno_1.default.findOne({
                            where: {
                                idUsuario: idusuario
                            }
                        });
                        res.send({ alumno: Alumno, usuario: sesion, token: token });
                        break;
                    case 'docente':
                        const Docente = yield docente_1.default.findOne({
                            where: {
                                idUsuario: idusuario
                            }
                        });
                        res.send({ docente: Docente, usuario: sesion, token: token });
                        break;
                }
            }
            catch (err) {
                res.status(500).json({ msg: 'Error Consulte as responsable' });
            }
        });
    }
    getCursos(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cursos = yield curso_1.default.findAll();
                res.json({ cursos });
            }
            catch (err) {
                res.status(500).send({ msg: 'Error consulte a responsable' });
            }
        });
    }
}
exports.indexController = new indexcontroller();
