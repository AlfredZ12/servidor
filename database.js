"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('bivppxwr3ef4nnchwsvx', 'ug4ea0vhu3lesmxy', 'RKzIvRE2XD2Tpf70b8GE', {
    host: "bivppxwr3ef4nnchwsvx-mysql.services.clever-cloud.com",
    dialect: 'mysql'
});
exports.default = db;
