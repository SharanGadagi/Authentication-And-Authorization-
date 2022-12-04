"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const userModel_1 = __importDefault(require("./models/userModel"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
userModel_1.default.sync({ force: false });
app.use('/user', userRoutes_1.default);
app.listen(config_1.PORT, () => {
    console.log(`app listening on: http://localhost:${config_1.PORT}`);
});
