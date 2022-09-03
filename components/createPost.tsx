import { FC, useState } from "react";
import { ArrowUpOnSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import addModelState from "../States/addModel";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import postModelState from "../States/postModel";

const CreatePost: FC = () => {
	//curremt session
	const { data: session } = useSession();

	// states
	const [selectedImage, setSelectedImage] = useState<any>(null);
	const [postContent, setPostContent] = useState<String>("");
	const [addModel, setAddModel] = useRecoilState(addModelState);

	// handle change selected image
	const onImageChange = (e: any) => {
		if (e.target.files && e.target.files.length > 0) {
			setSelectedImage(e.target.files[0]);
		}
	};

	// model animation
	const addModeVariants = {
		show: {
			opacity: 1,
			y: "-20px",
		},
		hidden: {
			opacity: 0,
			y: "0px",
		},
	};

	const [posts, setPosts] = useRecoilState(postModelState);

	const handleCreatePost = async (e: any) => {
		e.preventDefault();

		const createPostToast = toast.loading("Uploading Image...");

		const formData = new FormData();
		formData.append("file", selectedImage);
		formData.append("upload_preset", "ohrgoxw6");
		const data = await fetch(
			`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
			{
				method: "POST",
				body: formData,
			}
		);
		if (data.status !== 200) {
			toast.error("Upload failed", { id: createPostToast });
			return;
		}

		const response = await data.json();
		console.log(response);

		toast.loading("Finalizing Upload...", { id: createPostToast });

		const ressss = await fetch("/api/post/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user: session?.user,
				content: postContent,
				imageUrl: response.url,
			}),
		}).then((res) => res.json());

		if (!ressss.success) {
			toast.error(ressss.message, { id: createPostToast });
			return;
		}

		const posts = await fetch(`api/post/fetch`, {
			method: "GET",
		});
		const postsResponse = await posts.json();
		console.log(postsResponse);
		setPosts(postsResponse.result);
		setAddModel(false);
		toast.success(ressss.message, { id: createPostToast });
	};

	return (
		<motion.form
			onSubmit={handleCreatePost}
			variants={addModeVariants}
			animate="show"
			initial="hidden"
			exit="hidden"
			transition={{
				duration: 0.3,
				ease: "easeInOut",
			}}
			className="fixed top-0 bottom-0 left-0 right-0 m-auto flex flex-col p-6 items-center max-h-96 rounded-3xl shadow-2xl z-50 max-w-lg bg-white jus"
		>
			<div className="relative w-full flex justify-between items-center">
				<XMarkIcon
					onClick={() => setAddModel(false)}
					strokeWidth={"3px"}
					className="w-7 h-7 opacity-50 hover:opacity-100 duration-300 cursor-pointer"
				/>
				<h1 className="text-xl font-semibold">Create Post</h1>
				<button className="text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 py-1 rounded-lg hover:scale-105 font-semibold duration-300">
					Post
				</button>
			</div>
			<div className="grid grid-cols-2 h-full pt-3 w-full gap-6">
				<div className="col-span-1 flex justify-center relative items-center border hover:border-black transition-colors duration-300 rounded-3xl overflow-hidden">
					{selectedImage ? (
						<>
							<Image
								src={URL.createObjectURL(selectedImage)}
								alt=""
								layout="fill"
								objectFit="contain"
							/>
							<button
								type="button"
								onClick={() => setSelectedImage(null)}
								className="absolute bottom-5 text-red-500 z-50"
							>
								Remove
							</button>
						</>
					) : (
						<>
							<input
								onChange={onImageChange}
								type="file"
								id="fileinput"
								hidden
								required
							/>
							<label
								htmlFor="fileinput"
								className="flex justify-center items-center cursor-pointer group w-full h-full"
							>
								<ArrowUpOnSquareIcon className="w-7 h-7 opacity-30 group-hover:opacity-100 transition-opacity duration-300" />
							</label>
						</>
					)}
				</div>
				<textarea
					required
					value={postContent as string}
					onChange={(e) => setPostContent(e.target.value)}
					className="col-span-1 border h-full rounded-3xl resize-none py-3 px-5"
					placeholder="type something..."
				/>
			</div>
		</motion.form>
	);
};

export default CreatePost;
