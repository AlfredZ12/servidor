"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexcontrollers_1 = require("../controllers/indexcontrollers");
const authentication_1 = require("../helpers/authentication");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', indexcontrollers_1.indexController.ingresar);
        this.router.get('/perfil', authentication_1.isAuthenticated);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
