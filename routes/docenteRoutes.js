"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const docentecontrollers_1 = require("../controllers/docentecontrollers");
const authentication_1 = require("../helpers/authentication");
class DocenteRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/Grupo/lista', authentication_1.isAuthenticated, authentication_1.isDocente, docentecontrollers_1.docenteController.getListGrupo);
        this.router.post('/Grupo/createCalificacion/:idAlumno/:parcial', authentication_1.isAuthenticated, authentication_1.isDocente, docentecontrollers_1.docenteController.createCalificacion);
        this.router.get('/Grupo/Calificacion/:idAlumno', authentication_1.isAuthenticated, authentication_1.isDocente, docentecontrollers_1.docenteController.getCalificacion);
    }
}
const docenteRoutes = new DocenteRoutes();
exports.default = docenteRoutes.router;
