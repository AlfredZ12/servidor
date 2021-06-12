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
exports.adminController = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const administrador_1 = __importDefault(require("../models/administrador"));
const alumno_1 = __importDefault(require("../models/alumno"));
const docente_1 = __importDefault(require("../models/docente"));
const curso_1 = __importDefault(require("../models/curso"));
const asignatura_1 = __importDefault(require("../models/asignatura"));
const grupo_1 = __importDefault(require("../models/grupo"));
const alumno_grupo_1 = __importDefault(require("../models/alumno_grupo"));
const historial_alumno_1 = __importDefault(require("../models/historial_alumno"));
const paginate_1 = require("../helpers/paginate");
/**
 * @class admin controller
 */
class admincontroller {
    /**
     * @method createAdmin  recibe mediante resquest archivo json con los atributos para crear un Administrador y un usuario del tipo Administrador
     * y envia json con el resultado
     */
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoUsuario = req.body.usuario.tipoUsuario;
            try {
                console.log(req.body);
                const newUser = usuario_1.default.build({
                    usuario: req.body.usuario.matricula,
                    contrasena: req.body.usuario.contrasena,
                    tipoUsuario: tipoUsuario
                });
                yield newUser.save();
                const idusuario = newUser === null || newUser === void 0 ? void 0 : newUser.getDataValue('idUsuario');
                const newAdmin = yield administrador_1.default.build({
                    matricula: req.body.administrador.matricula,
                    nombre: req.body.administrador.nombre,
                    apellido: req.body.administrador.apellido,
                    idUsuario: idusuario
                }).save();
                res.json({ admin: newAdmin });
            }
            catch (err) {
                res.status(500).json({ msg: 'Error al crear administrador consulte a responsable' });
            }
        });
    }
    /**
     *
     * @method createAlumno crea un alumno desde un json recibido y un usuario tipo alumno
     * @param req
     * @param res
     */
    createAlumno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoUsuario = req.body.usuario.tipoUsuario;
            try {
                const newUser = usuario_1.default.build({
                    usuario: req.body.usuario.matricula,
                    contrasena: req.body.usuario.contrasena,
                    tipoUsuario: tipoUsuario
                });
                yield newUser.save();
                console.log(newUser);
                const idusuario = newUser === null || newUser === void 0 ? void 0 : newUser.getDataValue('idUsuario');
                console.log(idusuario);
                const newAlumno = yield alumno_1.default.build({
                    matricula: req.body.alumno.matricula,
                    nombre: req.body.alumno.nombre,
                    apellido: req.body.alumno.apellido,
                    semestre: req.body.alumno.semestre,
                    telefono: req.body.alumno.telefono,
                    carrera: req.body.alumno.carrera,
                    idUsuario: idusuario
                }).save();
                //id representa los id de las asignaturas preestablecidas en la BD
                let id = [1, 2, 3, 4, 5];
                let contador = 0;
                let newHistorialAlumno;
                let seguimiento;
                id.forEach((value) => __awaiter(this, void 0, void 0, function* () {
                    if (value > 1) {
                        seguimiento = "lock";
                    }
                    else {
                        seguimiento = "unlock";
                    }
                    newHistorialAlumno = historial_alumno_1.default.build({
                        idAsignatura: value,
                        estado: "No Cursado",
                        idAlumno: newAlumno.getDataValue('idAlumno'),
                        seguimiento: seguimiento
                    });
                    return newHistorialAlumno.save().then(result => {
                        if (result) {
                            contador++;
                            console.log(contador);
                        }
                    });
                }));
                res.json({ Alumno: newAlumno });
            }
            catch (err) {
                res.status(500).json({
                    msg: 'Error  al crear alumno consulte a responsable'
                });
            }
        });
    }
    /**
      * @method createDocente crea un Docente desde un json recibido y un usuario tipo Docente
      * @param req
      * @param res
      */
    createDocente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoUsuario = req.body.usuario.tipoUsuario;
            try {
                const newUser = usuario_1.default.build({
                    usuario: req.body.usuario.matricula,
                    contrasena: req.body.usuario.contrasena,
                    tipoUsuario: tipoUsuario
                });
                console.log("dentro" + req.body);
                console.log(newUser);
                yield newUser.save();
                const idusuario = newUser === null || newUser === void 0 ? void 0 : newUser.getDataValue('idUsuario');
                const newDocente = yield docente_1.default.build({
                    matricula: req.body.docente.matricula,
                    nombre: req.body.docente.nombre,
                    apellido: req.body.docente.apellido,
                    telefono: req.body.docente.telefono,
                    idUsuario: idusuario
                }).save();
                res.json({ docente: newDocente });
            }
            catch (err) {
                res.status(500).json({ msg: 'Error al crear docente consulte a responsable' });
            }
        });
    }
    /**
      * @method createCurso crea un Curso
      * @param req
      * @param res
      */
    createCurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body.curso);
            const fecha_inicio = req.body.curso.fecha_inicio;
            const fecha_fin = req.body.curso.fecha_fin;
            const descripcion = req.body.curso.descripcion;
            console.log(fecha_inicio, fecha_fin);
            try {
                if (fecha_inicio !== null || descripcion !== null || fecha_fin !== null) {
                    const newCurso = curso_1.default.build({
                        fecha_inicio: fecha_inicio,
                        fecha_fin: fecha_fin,
                        descripcion: descripcion,
                        estado: "activo"
                    });
                    yield newCurso.save();
                    res.send({ curso: newCurso });
                }
                else {
                    res.status(500).json({ msg: 'Campos vacios' });
                }
            }
            catch (err) {
                res.status(500).json({ msg: "Error al crear curso consulte a responsable" });
            }
        });
    }
    createAsignatura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const matricula = req.body.matricula;
            const descripcion = req.body.descripcion;
            try {
                if (matricula !== null || descripcion !== null) {
                    const newAsignatura = asignatura_1.default.build({
                        matricula: matricula,
                        descripcion: descripcion
                    });
                    yield newAsignatura.save();
                    res.send({ Asignatura: newAsignatura });
                }
                else {
                    res.status(500).json({ msg: 'Campos vacios' });
                }
            }
            catch (err) {
                res.status(500).json({ msg: "Error consulte a responsable" });
            }
        });
    }
    createGrupo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const matricula = req.body.grupo.matricula;
            const cantidad = req.body.grupo.cantidad_Alumnos;
            try {
                if (matricula !== null || cantidad !== null) {
                    const newGrupo = grupo_1.default.build({
                        matricula: req.body.grupo.matricula,
                        idAsignatura: req.body.grupo.idAsignatura,
                        idCurso: req.body.grupo.idCurso,
                        idDocente: req.body.grupo.idDocente,
                        cantidad_Alumnos: cantidad
                    });
                    newGrupo.save().then(result => {
                    }).catch(err => {
                        console.log(err);
                    });
                    res.json({ grupo: newGrupo });
                }
                else {
                    res.status(500).json({ msg: 'Campos vacios' });
                }
            }
            catch (err) {
                res.status(500).json({ msg: "Error al crear grupo consulte a responsable" });
            }
        });
    }
    deleteDocente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const matricula = req.body.matricula;
            try {
                const docentes = yield docente_1.default.findOne({ where: { matricula: matricula } });
                console.log(JSON.stringify(docentes));
                let usuarioDestroy = docentes === null || docentes === void 0 ? void 0 : docentes.getDataValue('idUsuario');
                console.log("id Usuario: " + usuarioDestroy);
                yield usuario_1.default.destroy({ where: { idUsuario: usuarioDestroy } });
                res.json({ usuario: `docente Eliminado con matricula:${matricula}` });
            }
            catch (error) {
                res.status(500).send({ msg: "Error al eliminar docente Consulte al Responsable" });
            }
        });
    }
    deleteGrupo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const matricula = req.body.matricula;
            try {
                yield grupo_1.default.destroy({ where: { matricula: matricula } });
                res.json({ usuario: `Grupo Eliminado con matricula:${matricula}` });
            }
            catch (error) {
                res.status(500).send({ msg: "Error al eliminar grupo Consulte al Responsable" });
            }
        });
    }
    addAlumnos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inscribe = yield alumno_grupo_1.default.build({
                    folio_pago: req.body.folio,
                    ispago: req.body.pago,
                    idAlumno: req.body.idAlumno,
                    idGrupo: req.body.idGrupo,
                    fecha: Date.now()
                }).save();
                res.json({ alumno: inscribe });
            }
            catch (err) {
                res.status(500).send({ msg: 'Error al agregar alumno consulte a responsable' });
            }
        });
    }
    getAsignaturas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const asignaturas = yield asignatura_1.default.findAll();
                res.json({ asignaturas: asignaturas });
            }
            catch (err) {
                res.status(500).send({ msg: 'Error consulte a Responsable' });
            }
        });
    }
    getDocentes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docentes = yield docente_1.default.findAll();
                res.json({ docentes: docentes });
            }
            catch (err) {
                res.status(500).send({ msg: 'Error consulte a Responsable' });
            }
        });
    }
    getGrupos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const grupos = yield grupo_1.default.findAll();
                res.json({ Grupos: grupos });
            }
            catch (err) {
                res.status(500).send({ msg: 'Error consulte a Responsable' });
            }
        });
    }
    getCursos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cursos = yield curso_1.default.findAll({ where: { estado: "activo" } });
                res.json({ cursos: cursos });
            }
            catch (err) {
                res.status(500).send({ msg: 'Error consulte a Responsable' });
            }
        });
    }
    getAlumnos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.page);
            try {
                let pagina = parseInt(req.params.page) - 1;
                let rows = 5;
                const alumnos = yield alumno_1.default.findAndCountAll({
                    order: [
                        ['apellido', 'ASC']
                    ],
                    offset: pagina, limit: rows
                });
                const pages = paginate_1.totalRow(alumnos.count, rows);
                res.json({ pages, Alumnos: alumnos });
            }
            catch (err) {
                res.status(500).send({ msg: 'Error consulte a Responsable' });
            }
        });
    }
    getAsignaturasByMatricula(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const asignatura = yield asignatura_1.default.findOne({ where: { matricula: req.body.matricula } });
                res.json({ asignatura });
            }
            catch (err) {
                res.status(500).send({ msg: 'Error consulte a Responsable' });
            }
        });
    }
    getDocentesByMatricula(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Docente = yield docente_1.default.findOne({ where: { matricula: req.body.matricula } });
                res.json({ Docente });
            }
            catch (err) {
                res.status(500).send({ msg: 'Error consulte a Responsable' });
            }
        });
    }
    getGruposByMatricula(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const grupo = yield grupo_1.default.findOne({ where: { matricula: req.body.matricula } });
                res.json({ grupo });
            }
            catch (err) {
                res.status(500).send({ msg: 'Error consulte a Responsable' });
            }
        });
    }
    getAlumnosByMatricula(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Alumno = yield alumno_1.default.findOne({ where: { matricula: req.body.matricula } });
                if (!Alumno) {
                    res.send({ msg: 'No existe' });
                }
                res.json({ Alumno });
            }
            catch (err) {
                res.status(500).send({ msg: 'Error consulte a Responsable' });
            }
        });
    }
    getConstanciaParcial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idAlumno = req.body.Alumno;
                alumno_grupo_1.default.findOne({
                    where: {
                        idAlumno: idAlumno,
                        estado: 'cursando'
                    }, include: ['alumno']
                }).then(result => {
                    res.json({ constancia: result });
                });
            }
            catch (err) {
                res.status(500).send({ msg: 'Error consulte a Responsable' });
            }
        });
    }
    getConstancia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idAlumno = req.body.Alumno;
            alumno_grupo_1.default.findAll({
                where: {
                    idAlumno: idAlumno
                }, include: ['alumno']
            }).then(result => {
                res.json({ constancia: result });
            });
        });
    }
}
exports.adminController = new admincontroller();
