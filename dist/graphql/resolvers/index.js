"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postResolver_1 = __importDefault(require("./postResolver"));
const userResolver_1 = __importDefault(require("./userResolver"));
const resolvers = {
    Query: Object.assign({}, postResolver_1.default.Query),
    Mutation: Object.assign(Object.assign({}, userResolver_1.default.Mutation), postResolver_1.default.Mutation),
};
exports.default = resolvers;
//# sourceMappingURL=index.js.map