"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const typeDefs_1 = __importDefault(require("./graphql/typeDefs"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
dotenv_1.default.config();
const mongoUrl = process.env.MONGO_URL;
const jwt_secret_key = process.env.JWT_SECRET_KEY;
const expires_in = process.env.EXPIRES_IN;
if (!mongoUrl)
    throw new Error('Please provide mongo url.');
if (!jwt_secret_key)
    throw new Error('Please provide secret key.');
if (!expires_in)
    throw new Error('Please provide expires in duration for token.');
const server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default,
    context: ({ req }) => ({ req }),
    cors: true,
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