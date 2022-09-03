import { FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Post from "./post";
import postModelState from "../States/postModel";

const Feed: FC = () => {
	const [posts, setPosts] = useRecoilState(postModelState);

	console.log(posts);

	return (
		<div className="pt-24 w-screen">
			<div className="w-screen flex justify-center">
				<div className="w-full max-w-md rounded-3xl">
					{posts.map((data: any) => (
						<Post key={data._id} post={data} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Feed;
