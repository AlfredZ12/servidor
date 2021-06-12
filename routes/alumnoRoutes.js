"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alumunocontroller_1 = require("../controllers/alumunocontroller");
const authentication_1 = require("../helpers/authentication");
class AlumnoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/alumnos/inscripcion/:id', authentication_1.isAuthenticated, authentication_1.isAlumno, alumunocontroller_1.alumnoController.enroll);
        this.router.get('/alumnos/getCurso/:id', authentication_1.isAuthenticated, authentication_1.isAlumno, alumunocontroller_1.alumnoController.getCursoActivo);
        this.router.get('/alumnos/getGrupo/idGrupo=:idGrupo/idAlumno=:idAlumno', authentication_1.isAuthenticated, authentication_1.isAlumno, alumunocontroller_1.alumnoController.getGrupoToEnroll);
    }
}
const alumnoRoutes = new AlumnoRoutes();
exports.default = alumnoRoutes.router;
