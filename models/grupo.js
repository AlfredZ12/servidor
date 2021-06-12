"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const asignatura_1 = __importDefault(require("./asignatura"));
const curso_1 = __importDefault(require("./curso"));
const docente_1 = __importDefault(require("./docente"));
const Grupo = database_1.default.define('grupo', {
    idGrupo: { primaryKey: true, type: sequelize_1.DataTypes.INTEGER, unique: true, autoIncrement: true },
    matricula: { type: sequelize_1.DataTypes.STRING },
    cantidad_Alumnos: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    estado: { type: sequelize_1.DataTypes.STRING, defaultValue: 'abierto' }
}, { timestamps: false });
Grupo.belongsTo(asignatura_1.default, { foreignKey: 'idAsignatura' });
/**
 * relaciones de Grupos
 */
Grupo.belongsTo(docente_1.default, { foreignKey: 'idDocente', onDelete: 'CASCADE', onUpdate: 'RESTRICT' });
docente_1.default.hasOne(Grupo, { as: 'grupos', foreignKey: 'idDocente' });
Grupo.belongsTo(curso_1.default, { foreignKey: 'idCurso', onDelete: 'CASCADE', onUpdate: 'RESTRICT' });
curso_1.default.hasOne(Grupo, { as: 'grupos', foreignKey: 'idCurso' });
exports.default = Grupo;
