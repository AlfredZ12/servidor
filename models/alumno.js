"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const usuario_1 = __importDefault(require("./usuario"));
const Alumno = database_1.default.define('alumno', {
    idAlumno: { primaryKey: true, type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, unique: true },
    matricula: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    nombre: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    apellido: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    semestre: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    telefono: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    carrera: { type: sequelize_1.DataTypes.STRING, allowNull: false }
}, { timestamps: false });
Alumno.belongsTo(usuario_1.default, { foreignKey: 'idUsuario' });
exports.default = Alumno;
