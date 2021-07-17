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
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const postModel_1 = __importDefault(require("./models/postModel"));
dotenv_1.default.config();
const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl)
    throw new Error('Please provide mongo url.');
const typeDefs = graphql_tag_1.default `
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]
  }
`;
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
    },
};
const server = new apollo_server_1.ApolloServer({
    typeDefs,
    resolvers,
});
mongoose_1.default
    .connect(mongoUrl, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => {
    console.log(`connected to database succefully.`);
    return server.listen({ port: 5000 });
})
    .then((res) => {
    console.log(`server is running at ${res.url}`);
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map