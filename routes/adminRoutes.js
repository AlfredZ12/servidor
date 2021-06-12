"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admincontroller_1 = require("../controllers/admincontroller");
const authentication_1 = require("../helpers/authentication");
class AdminRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/administracion/createAdmin', authentication_1.isAuthenticated, authentication_1.isAdmin, admincontroller_1.adminController.createAdmin);
        this.router.post('/administracion/createAlumno', authentication_1.isAuthenticated, authentication_1.isAdmin, admincontroller_1.adminController.createAlumno);
        this.router.post('/administracion/createDocente', authentication_1.isAuthenticated, authentication_1.isAdmin, admincontroller_1.adminController.createDocente);
        this.router.post('/administracion/createCurso', authentication_1.isAuthenticated, authentication_1.isAdmin, admincontroller_1.adminController.createCurso);
        this.router.post('/administracion/createAsignatura', authentication_1.isAuthenticated, authentication_1.isAdmin, admincontroller_1.adminController.createAsignatura);
        this.router.post('/administracion/createGrupo', authentication_1.isAuthenticated, authentication_1.isAdmin, admincontroller_1.adminController.createGrupo);
        this.router.get('/administracion/getCursos', authentication_1.isAuthenticated, authentication_1.isAdmin, admincontroller_1.adminController.getCursos);
        this.router.get('/administracion/getAsignaturas', authentication_1.isAuthenticated, authentication_1.isAdmin, admincontroller_1.adminController.getAsignaturas);
        this.router.get('/administracion/getDocentes', authentication_1.isAuthenticated, authentication_1.isAdmin, admincontroller_1.adminController.getDocentes);
        this.router.get('/administracion/getAlumnos/?page=:page', authentication_1.isAuthenticated, authentication_1.isAdmin, admincontroller_1.adminController.getAlumnos);
        this.router.delete('/administracion/deleteDocente', authentication_1.isAuthenticated, authentication_1.isAdmin, admincontroller_1.adminController.deleteDocente);
        this.router.delete('/administracion/deleteGrupo', authentication_1.isAuthenticated, authentication_1.isAdmin, admincontroller_1.adminController.deleteGrupo);
        //this.router.post('/grupos/addAlumnos',isAuthenticated,isAdmin,adminController.addAlumnos);
    }
}
const adminRoutes = new AdminRoutes();
exports.default = adminRoutes.router;
