import mongoose from "mongoose";

const postSchema = mongoose.Schema(
	{
		content: String,
		user: {
			id: String,
			username: String,
			imageUrl: String,
		},
		imageUrl: String,
	},
	{
		timestamps: true,
	}
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
