"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const alumno_1 = __importDefault(require("./alumno"));
const asignatura_1 = __importDefault(require("./asignatura"));
const historial_alumno = database_1.default.define('historial_alumno', {
    idhistorial_Alumno: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    estado: { type: sequelize_1.DataTypes.STRING },
    seguimiento: { type: sequelize_1.DataTypes.STRING },
    fecha: { type: sequelize_1.DataTypes.DATE, defaultValue: Date.now() },
}, { timestamps: false });
historial_alumno.belongsTo(alumno_1.default, { foreignKey: 'idAlumno', onUpdate: 'CASCADE' });
historial_alumno.belongsTo(asignatura_1.default, { foreignKey: 'idAsignatura' });
exports.default = historial_alumno;
