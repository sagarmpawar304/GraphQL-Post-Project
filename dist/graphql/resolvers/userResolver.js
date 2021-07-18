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
const apollo_server_1 = require("apollo-server");
const userModel_1 = __importDefault(require("../../models/userModel"));
const token_1 = require("../../services/token");
const validators_1 = require("../../utils/validators");
const password_1 = require("../../services/password");
const resolvers = {
    Mutation: {
        register(_, { registerInput: { username, email, password, confirmPassword } }) {
            return __awaiter(this, void 0, void 0, function* () {
                const { errors, valid } = validators_1.validateRegisterInput({
                    username,
                    email,
                    password,
                    confirmPassword,
                });
                if (!valid) {
                    throw new apollo_server_1.UserInputError('Please provide valid data', {
                        errors,
                    });
                }
                const isUsernameUsed = yield userModel_1.default.findOne({ username });
                if (isUsernameUsed) {
                    throw new apollo_server_1.UserInputError('Username is taken', {
                        errors: {
                            username: 'Username is taken.',
                        },
                    });
                }
                const isEmailUsed = yield userModel_1.default.findOne({ email });
                if (isEmailUsed) {
                    throw new apollo_server_1.UserInputError('Email already in use', {
                        errors: {
                            username: 'Email already in use. Please try to sign in.',
                        },
                    });
                }
                const user = new userModel_1.default({
                    username,
                    email,
                    password,
                    createdAt: new Date().toISOString(),
                });
                yield user.save();
                const token = token_1.createToken(user.id, user.email);
                const { id, createdAt } = user;
                return {
                    id,
                    username: user.username,
                    email: user.email,
                    createdAt,
                    token,
                };
            });
        },
        login(_any, { loginInput: { username, password } }) {
            return __awaiter(this, void 0, void 0, function* () {
                const { errors, valid } = validators_1.validateLoginInput({ username, password });
                if (!valid) {
                    throw new apollo_server_1.UserInputError('Please provide valid data.', {
                        errors,
                    });
                }
                const user = yield userModel_1.default.findOne({ username });
                if (!user) {
                    throw new apollo_server_1.UserInputError("User doesn't exist.", {
                        errors: {
                            username: "User doesn't exist with this username.",
                        },
                    });
                }
                const isPasswordMatched = yield password_1.comparePassword(password, user.password);
                if (!isPasswordMatched)
                    throw new apollo_server_1.UserInputError("password doesn't match", {
                        errors: {
                            password: "Password doesn't match",
                        },
                    });
                const token = token_1.createToken(user.id, user.email);
                return {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt,
                    token,
                };
            });
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=userResolver.js.map