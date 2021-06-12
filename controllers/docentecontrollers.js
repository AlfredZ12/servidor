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
exports.docenteController = void 0;
const alumno_grupo_1 = __importDefault(require("../models/alumno_grupo"));
const alumno_1 = __importDefault(require("../models/alumno"));
class docentecontroller {
    createCalificacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("params: " + req.params.idAlumno);
            try {
                const alumno = yield alumno_grupo_1.default.findOne({
                    where: { idAlumno: req.params.idAlumno }
                });
                if (req.params.parcial === '1') {
                    yield (alumno === null || alumno === void 0 ? void 0 : alumno.update({ parcial_1: req.body.calificacion }));
                }
                if (req.params.parcial === '2') {
                    yield (alumno === null || alumno === void 0 ? void 0 : alumno.update({ parcial_2: req.body.calificacion }));
                }
                if (req.params.parcial === '3') {
                    yield (alumno === null || alumno === void 0 ? void 0 : alumno.update({ parcial_3: req.body.calificacion }));
                }
                let parcial_1 = alumno === null || alumno === void 0 ? void 0 : alumno.getDataValue("parcial_1");
                let parcial_2 = alumno === null || alumno === void 0 ? void 0 : alumno.getDataValue("parcial_2");
                let parcial_3 = alumno === null || alumno === void 0 ? void 0 : alumno.getDataValue("parcial_3");
                let calificacion = (((parcial_1) + (parcial_2) + (parcial_3)) / 3);
                yield (alumno === null || alumno === void 0 ? void 0 : alumno.update({ calificacion: calificacion }));
                res.json({ msg: 'Registro de calificacion exitoso' });
            }
            catch (err) {
                res.status(500).send({ msg: 'Error consulte a Responsable' });
            }
        });
    }
    getListGrupo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idGrupo = req.body.idGrupo;
                alumno_grupo_1.default.findAll({
                    where: {
                        idGrupo: idGrupo
                    }, include: ['alumno']
                }).then(result => {
                    res.json({ Grupo: result });
                });
            }
            catch (err) {
                res.status(500).send({ msg: 'Error consulte a Responsable' });
            }
        });
    }
    getCalificacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("params: " + req.params.idAlumno);
            try {
                const alumno = yield alumno_1.default.findByPk(req.params.idAlumno);
                const alumno_grupo = yield alumno_grupo_1.default.findOne({
                    where: { idAlumno: req.params.idAlumno }
                });
                res.json({ alumno, alumno_grupo });
            }
            catch (err) {
                res.status(500).send({ msg: 'Error consulte a Responsable' });
            }
        });
    }
}
exports.docenteController = new docentecontroller();
