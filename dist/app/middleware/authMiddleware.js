"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const JWT_SECRET = config_1.default.jwt_secret;
const verifyToken = (req, res, next) => {
    var _a;
    //will get token this format Bearer token
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    console.log("TOken ", token);
    if (!token) {
        res.status(401).send({
            message: "Invalid token and Access Denied"
        });
        return;
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send({
                message: "Invalid token and Access Denied"
            });
            return;
        }
        req.decoded = decoded;
        next();
    });
};
exports.verifyToken = verifyToken;
