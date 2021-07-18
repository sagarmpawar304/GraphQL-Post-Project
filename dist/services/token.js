"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET_KEY;
const expiresIn = process.env.EXPIRES_IN;
const createToken = (id, username) => {
    return jsonwebtoken_1.default.sign({ id, username }, secret, { expiresIn });
};
exports.createToken = createToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=token.js.map