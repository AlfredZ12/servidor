"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const alumnoRoutes_1 = __importDefault(require("./routes/alumnoRoutes"));
const database_1 = __importDefault(require("./database"));
const docenteRoutes_1 = __importDefault(require("./routes/docenteRoutes"));
/**
 * Class server
 */
class server {
    /**
     * constructor
     */
    constructor() {
        this.app = express_1.default();
        this.dbConnection();
        this.config();
        this.routes();
    }
    /**
     *
     */
    config() {
        this.app.set('port', process.env.PORT || 1899);
        this.app.use(express_1.default.static(__dirname + '/public'));
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default(this.configCors()));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.authenticate();
                console.log("DB is connected");
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use(adminRoutes_1.default);
        this.app.use(docenteRoutes_1.default);
        this.app.use(alumnoRoutes_1.default);
    }
    configCors() {
        const options = {
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Access-Token',
                'authorization'
            ],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: `http://localhost:4200`,
            preflightContinue: false,
        };
        return options;
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port", this.app.get('port'));
        });
    }
}
const Server = new server();
Server.start();
