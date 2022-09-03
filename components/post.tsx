import Image from "next/image";
import { FC, useState } from "react";
import {
	ChatBubbleOvalLeftIcon,
	HeartIcon,
	PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";

const Post: FC<any> = ({ post }) => {
	// liked state
	const [liked, setLiked] = useState(false);
	const [paddingTop, setPaddingTop] = useState("0");

	return (
		<div key={post._id} className="w-full relative mb-10">
			<div className="flex space-x-3 pb-4">
				<div className="relative w-10 h-10 border-2 border-white rounded-xl overflow-hidden">
					<Image src={post.user.imageUrl} layout="fill" />
				</div>
				<div>
					<h1 className="font-semibold text-dark">
						{post.user.username}
					</h1>
					<p className="text-sm -translate-y-1 font-medium opacity-60">
						24, April 2022
					</p>
				</div>
			</div>
			<p className="px-3 mb-2">
				<span className="font-semibold mr-2">{post.user.username}</span>
				{post.content}
			</p>
			<div className="relative w-full h-96" style={{ paddingTop }}>
				<Image
					src={post.imageUrl}
					layout="fill"
					objectFit="cover"
					onLoad={({ target }) => {
						const { naturalWidth, naturalHeight } =
							target as HTMLImageElement;
						setPaddingTop(
							`calc(100% / (${naturalWidth} / ${naturalHeight})`
						);
					}}
					style={{ borderRadius: "30px" }}
				/>
			</div>
		</div>
	);
};

export default Post;
