import Post from "../../../models/Post";
import connectDb from "../../../utils/mongoose";

export default async function handler(req, res) {
	if (req.method === "POST") {
		// destruture body
		const { user, content, imageUrl } = req.body;

		console.log(user, content, imageUrl);

		if (!user || !content || !imageUrl) {
			res.status(406).json({ success: false, message: "body is empty" });
			return;
		}

		await connectDb();

		try {
			const createPost = await Post.create({
				content,
				imageUrl,
				user: {
					id: user.id,
					username: user.name,
					imageUrl: user.image,
				},
			});

			res.status(200).json({
				success: true,
				message: "Successfully uploaded",
				result: createPost,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: "Something went wrong",
			});
		}
	} else {
		res.status(500).json({ success: false, message: "Invaild route" });
	}
}
