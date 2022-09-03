import Post from "../../../models/Post";
import connectDb from "../../../utils/mongoose";

export default async function handler(req, res) {
	if (req.method === "GET") {
		await connectDb();
		try {
			const posts = await Post.find()
				.sort([["createdAt", -1]])
				.limit(15);
			res.status(200).json({
				success: true,
				message: "Post successully fetched",
				result: posts,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: "Fetching post failed",
				error,
			});
		}

		res.status(200).json({
			success: true,
			message: "Post successully fetched",
			result: "posts",
		});
	} else {
		res.status(500).json({ success: false, message: "Route invaild" });
	}
}
