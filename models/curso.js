"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const Curso = database_1.default.define('curso', {
    idCurso: { primaryKey: true, type: sequelize_1.DataTypes.INTEGER, autoIncrement: true },
    fecha_inicio: { type: sequelize_1.DataTypes.DATE },
    fecha_fin: { type: sequelize_1.DataTypes.DATE },
    descripcion: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    estado: { type: sequelize_1.DataTypes.STRING }
}, { timestamps: false });
exports.default = Curso;
