"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const usuario_1 = __importDefault(require("./usuario"));
const Docente = database_1.default.define('docente', {
    idDocente: { primaryKey: true, type: sequelize_1.DataTypes.INTEGER, autoIncrement: true },
    matricula: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    nombre: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    apellido: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    telefono: { type: sequelize_1.DataTypes.STRING, allowNull: false }
}, { timestamps: false });
Docente.belongsTo(usuario_1.default, { foreignKey: 'idUsuario' });
exports.default = Docente;
