"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alumno_grupo = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const alumno_1 = __importDefault(require("./alumno"));
const grupo_1 = __importDefault(require("./grupo"));
exports.Alumno_grupo = database_1.default.define('alumno_grupo', {
    idAlumno_grupo: { primaryKey: true, type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, allowNull: false },
    folio_pago: { type: sequelize_1.DataTypes.STRING },
    ispago: { type: sequelize_1.DataTypes.INTEGER },
    fecha: { type: sequelize_1.DataTypes.DATE },
    parcial_1: { type: sequelize_1.DataTypes.FLOAT },
    parcial_2: { type: sequelize_1.DataTypes.FLOAT },
    parcial_3: { type: sequelize_1.DataTypes.FLOAT },
    calificacion: { type: sequelize_1.DataTypes.FLOAT },
    estado: { type: sequelize_1.DataTypes.STRING }
}, { timestamps: false });
/**
 * relaciones one to one
 */
exports.Alumno_grupo.belongsTo(alumno_1.default, { foreignKey: 'idAlumno' });
alumno_1.default.hasOne(exports.Alumno_grupo, { as: 'alumno_grupos', foreignKey: 'idAlumno' });
exports.Alumno_grupo.belongsTo(grupo_1.default, { foreignKey: 'idGrupo' });
grupo_1.default.hasOne(exports.Alumno_grupo, { as: 'alumno_grupos', foreignKey: 'idGrupo' });
exports.default = exports.Alumno_grupo;
