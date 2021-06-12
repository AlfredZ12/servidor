"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const Usuario = database_1.default.define('usuario', {
    idUsuario: { primaryKey: true, type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, unique: true },
    usuario: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    contrasena: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    tipoUsuario: { type: sequelize_1.DataTypes.STRING, allowNull: false },
}, { timestamps: false });
exports.default = Usuario;
