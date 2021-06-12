"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAlumnoF = exports.isDocenteF = exports.isAdminisF = void 0;
const isAdminisF = (tipoUsuario) => {
    tipoUsuario = tipoUsuario.toLocaleLowerCase();
    return tipoUsuario === "administrador" ? true : false;
};
exports.isAdminisF = isAdminisF;
const isDocenteF = (tipoUsuario) => {
    tipoUsuario = tipoUsuario.toLocaleLowerCase();
    return tipoUsuario === "docente" ? true : false;
};
exports.isDocenteF = isDocenteF;
/**
 *
 * @param tipoUsuario metodo para verificar si el tipo de usuario es Alumno
 * @returns regresa verdadre o falso
 */
const isAlumnoF = (tipoUsuario) => {
    console.log(tipoUsuario);
    tipoUsuario = tipoUsuario.toLocaleLowerCase();
    console.log(tipoUsuario);
    return tipoUsuario === "alumno" ? true : false;
};
exports.isAlumnoF = isAlumnoF;
