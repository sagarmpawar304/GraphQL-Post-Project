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
const postModel_1 = __importDefault(require("../../models/postModel"));
const apollo_server_1 = require("apollo-server");
const authorization_1 = require("../../middlewares/authorization");
const resolvers = {
    Query: {
        getPosts() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const posts = yield postModel_1.default.find();
                    return posts;
                }
                catch (err) {
                    throw new Error(err);
                }
            });
        },
        getPost(_, { postId }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const post = yield postModel_1.default.findById(postId);
                    if (post) {
                        return post;
                    }
                    else {
                        throw new Error('Post not found.');
                    }
                }
                catch (err) {
                    throw new Error(err);
                }
            });
        },
    },
    Mutation: {
        createPost(_, { body }, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = authorization_1.checkAuth(context);
                const post = new postModel_1.default({
                    body,
                    user: user.id,
                    username: user.username,
                    createdAt: new Date().toISOString(),
                });
                yield post.save();
                return post;
            });
        },
        deletePost(_, { postId }, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = authorization_1.checkAuth(context);
                try {
                    const post = yield postModel_1.default.findById(postId);
                    if (post) {
                        if (post.username === user.username) {
                            yield post.delete();
                            return 'Post successfully deleted';
                        }
                        else {
                            throw new apollo_server_1.AuthenticationError('Action not allowed');
                        }
                    }
                    else {
                        throw new Error('Post not found');
                    }
                }
                catch (err) {
                    throw new Error(err);
                }
            });
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=postResolver.js.map