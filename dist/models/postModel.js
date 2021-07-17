"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String,
        },
    ],
    likes: [
        {
            username: String,
            createdAt: String,
        },
    ],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
});
postSchema.methods.build = (postAttr) => {
    return new Post(postAttr);
};
const Post = mongoose_1.model('Post', postSchema);
exports.default = Post;
//# sourceMappingURL=postModel.js.map