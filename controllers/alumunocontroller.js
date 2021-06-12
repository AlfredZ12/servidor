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
exports.alumnoController = void 0;
const sequelize_1 = require("sequelize");
const alumno_grupo_1 = __importDefault(require("../models/alumno_grupo"));
const asignatura_1 = __importDefault(require("../models/asignatura"));
const curso_1 = __importDefault(require("../models/curso"));
const docente_1 = __importDefault(require("../models/docente"));
const grupo_1 = __importDefault(require("../models/grupo"));
const historial_alumno_1 = __importDefault(require("../models/historial_alumno"));
class alumnocontroller {
    enroll(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const enrollGrupo = yield grupo_1.default.findByPk(req.params.id);
                const cantidad_Alumnos = enrollGrupo === null || enrollGrupo === void 0 ? void 0 : enrollGrupo.getDataValue('cantidad_Alumnos');
                const isInscrito = yield alumno_grupo_1.default.findOne({
                    where: sequelize_1.Sequelize.or({ idAlumno: req.body.inscripcion.idAlumno, idGrupo: req.params.id, estado: 'cursando' }, 
                    // Sequelize.and( 
                    {
                        [sequelize_1.Op.and]: { idAlumno: req.body.inscripcion.idAlumno, estado: 'cursando' }
                    })
                });
                const historial = yield historial_alumno_1.default.findOne({
                    where: {
                        idAsignatura: enrollGrupo === null || enrollGrupo === void 0 ? void 0 : enrollGrupo.getDataValue('idAsignatura'),
                        idAlumno: req.body.inscripcion.idAlumno
                    }
                });
                if ((historial === null || historial === void 0 ? void 0 : historial.getDataValue('seguimiento')) === 'unlock') {
                    const aprobados = yield alumno_grupo_1.default.findOne({
                        where: sequelize_1.Sequelize.or({
                            idAlumno: req.body.inscripcion.idAlumno,
                            estado: 'reprobado'
                        }, {
                            [sequelize_1.Op.and]: [{ idAlumno: req.body.inscripcion.idAlumno }, { isPago: '0' }]
                        }),
                        include: ['grupo']
                    });
                    if (isInscrito == null) {
                        if (cantidad_Alumnos > 0) {
                            if (aprobados == null) {
                                if (req.body.inscripcion.folio === "") {
                                    const inscribe = yield alumno_grupo_1.default.build({
                                        folio_pago: '',
                                        ispago: 0,
                                        idAlumno: req.body.inscripcion.idAlumno,
                                        idGrupo: req.params.id,
                                        estado: "cursando",
                                        fecha: Date.now()
                                    }).save();
                                    let newCantidad_alumnos = (cantidad_Alumnos - 1);
                                    if (newCantidad_alumnos == 0) {
                                        yield (enrollGrupo === null || enrollGrupo === void 0 ? void 0 : enrollGrupo.update({
                                            cantidad_Alumnos: newCantidad_alumnos,
                                            estado: 'cerrado'
                                        }));
                                    }
                                    else {
                                        yield (enrollGrupo === null || enrollGrupo === void 0 ? void 0 : enrollGrupo.update({
                                            cantidad_Alumnos: newCantidad_alumnos
                                        }));
                                    }
                                    res.json({ alumno: inscribe });
                                }
                                else {
                                    const inscribe = yield alumno_grupo_1.default.build({
                                        folio_pago: req.body.inscripcion.folio,
                                        ispago: 1,
                                        idAlumno: req.body.inscripcion.idAlumno,
                                        idGrupo: req.params.id,
                                        estado: "cursando",
                                        fecha: Date.now()
                                    }).save();
                                    let newCantidad_alumnos = (cantidad_Alumnos - 1);
                                    if (newCantidad_alumnos == 0) {
                                        yield (enrollGrupo === null || enrollGrupo === void 0 ? void 0 : enrollGrupo.update({
                                            cantidad_Alumnos: newCantidad_alumnos,
                                            estado: 'cerrado'
                                        }));
                                    }
                                    else {
                                        yield (enrollGrupo === null || enrollGrupo === void 0 ? void 0 : enrollGrupo.update({
                                            cantidad_Alumnos: newCantidad_alumnos
                                        }));
                                    }
                                    res.json({ alumno: inscribe });
                                }
                            }
                            else {
                                res.status(409).json({
                                    msg: `Tienes adeudo en Asignatura con ID: ${(_a = aprobados === null || aprobados === void 0 ? void 0 : aprobados.getDataValue('grupo')) === null || _a === void 0 ? void 0 : _a.idAsignatura} 
                            estado: ${aprobados === null || aprobados === void 0 ? void 0 : aprobados.getDataValue('estado')}, Pago: ${aprobados.getDataValue('ispago') == 0 ?
                                        'Tienes un deuda, favor de pasar a pagar para continuar su proceso de inscripcion' : 'Pagado'}`
                                });
                            }
                        }
                        else {
                            res.status(401).json({ msg: 'No puedes inscribirte a materia llena' });
                        }
                    }
                    else {
                        res.status(409).json({ msg: 'No puedes inscribirte en mas de un nivel' });
                    }
                }
                else {
                    res.status(409).json({ msg: 'Aun no puedes inscribirte a esta materia', isInscrito });
                }
            }
            catch (err) {
                res.status(500).json({ msg: 'Error al agregar alumno consulte a responsable' });
            }
        });
    }
    getCalificaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Calificaciones = yield alumno_grupo_1.default.findOne({ where: { idAlumno: req.body.idAlumno } });
                res.json({ Calificaciones });
            }
            catch (err) {
                res.status(500).send({ msg: 'Error al consultar calificaciones' });
            }
        });
    }
    getCursoActivo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const curso = yield curso_1.default.findOne({
                    where: { estado: 'activo' }
                });
                if (curso) {
                    const disponible = yield historial_alumno_1.default.findOne({
                        where: {
                            idAlumno: req.params.id,
                            seguimiento: 'unlock',
                            estado: 'No Cursado'
                        }
                    });
                    //   const noDisponible = await historial_alumno.findAll({where:{idAlumno: req.params.id ,seguimiento: 'lock', estado: 'No Cursado'}});
                    const grupos = yield grupo_1.default.findAll({
                        where: {
                            idCurso: curso.getDataValue('idCurso'),
                            idAsignatura: disponible === null || disponible === void 0 ? void 0 : disponible.getDataValue('idAsignatura')
                        },
                        attributes: {
                            exclude: ['idDocente']
                        },
                        include: [{
                                model: docente_1.default,
                                attributes: { exclude: ['idDocente', 'telefono', 'idUsuario'] }
                            },
                            {
                                model: asignatura_1.default
                            }]
                    });
                    res.json({ curso, grupos, asignatura: { disponible } });
                }
            }
            catch (err) {
                res.status(500).send({ msg: 'Error consulte a Responsable' });
            }
        });
    }
    getGrupoToEnroll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const grupo = yield grupo_1.default.findOne({
                    where: {
                        idGrupo: req.params.idGrupo
                    },
                    include: ['docente', 'asignatura'],
                });
                const idAsignatura = grupo === null || grupo === void 0 ? void 0 : grupo.getDataValue('idAsignatura');
                const lock = yield historial_alumno_1.default.findOne({ where: { idAsignatura: idAsignatura, idAlumno: req.params.idAlumno, seguimiento: 'lock' } });
                if (grupo !== null) {
                    if (lock) {
                        res.status(401).json({ msg: 'No tienes acceso a esta asignatura' });
                    }
                    else {
                        res.status(200).json({ grupo });
                    }
                }
                else {
                    res.status(404).json({ msg: 'Pagina no encontrada' });
                }
            }
            catch (err) {
                res.status(500).send({ msg: 'Error consulte a Responsable' });
            }
        });
    }
}
exports.alumnoController = new alumnocontroller();
