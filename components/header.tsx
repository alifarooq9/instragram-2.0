import Image from "next/image";
import { FC, useState } from "react";
import avatarImage from "../public/avatar.webp";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

const Header: FC = () => {
	// current session
	const { data: session } = useSession();

	// menu state
	const [menu, setMenu] = useState(false);

	// menu animation
	const menuVariant = {
		show: {
			opacity: 1,
			scale: "100%",
			x: "0px",
			y: "0px",
		},
		hidden: {
			opacity: 0,
			scale: "20%",
			x: "150px",
			y: "-130px",
		},
	};

	return (
		<header className="fixed z-50 w-screen h-20 flex items-center justify-center">
			<div className="w-full max-w-lg justify-between flex items-center border-b bg-white border-r border-l rounded-b-3xl border-dark border-opacity-20 px-8 h-full">
				<h1 className="font text-4xl">Instagram</h1>
				<div className="relative">
					<button
						onClick={() => {
							menu ? setMenu(false) : setMenu(true);
						}}
						className="w-8 h-8 hover:shadow-xl hover:scale-105 duration-200 relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl"
					>
						<Image
							src={session?.user?.image as string}
							alt="avatar image"
							layout="fill"
							objectFit="cover"
							className="border rounded-xl"
						/>
					</button>
					<AnimatePresence>
						{menu && (
							<motion.div
								variants={menuVariant}
								animate="show"
								initial="hidden"
								exit="hidden"
								transition={{
									duration: 0.27,
									ease: "easeInOut",
								}}
								className="absolute top-14 right-0 max-w-sm flex py-14 flex-col items-center justify-center w-screen bg-white rounded-3xl shadow-xl"
							>
								<h1 className="font-bold text-2xl opacity-90">
									Hi, Ali Muhammad
								</h1>
								<p className="font-medium opacity-70 -translate-y-0.5">
									alimuhammadf5@gmail.com
								</p>
								<button className="mt-7 border-2 border-dark font-semibold px-7 py-3 rounded-2xl opacity-70 border-opacity-30 hover:opacity-100 hover:border-opacity-50 duration-300">
									Manage Settings
								</button>
								<button
									onClick={() => signOut({ redirect: false })}
									className="mt-2 border-2 border-red-500 text-red-500 font-semibold px-10 py-3 rounded-2xl opacity-70 border-opacity-30 hover:opacity-100 hover:border-opacity-50 duration-300"
								>
									Logout
								</button>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</header>
	);
};

export default Header;
