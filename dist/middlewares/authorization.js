"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const apollo_server_1 = require("apollo-server");
const token_1 = require("../services/token");
const checkAuth = (context) => {
    const headers = context.req.headers.authorization;
    if (headers) {
        const token = headers.split('Bearer ')[1];
        if (token) {
            try {
                const user = token_1.verifyToken(token);
                return user;
            }
            catch (err) {
                throw new apollo_server_1.AuthenticationError(`Invalid/Expired token`);
            }
        }
        else {
            throw new apollo_server_1.AuthenticationError(`Authentication token must be "Bearer [token]"`);
        }
    }
    else {
        throw new apollo_server_1.AuthenticationError('Authorization header must be provided.');
    }
};
exports.checkAuth = checkAuth;
exports.default = exports.checkAuth;
//# sourceMappingURL=authorization.js.map