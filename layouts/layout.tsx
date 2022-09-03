import { useSession } from "next-auth/react";
import Head from "next/head";
import { FC, ReactNode } from "react";
import Image from "next/image";
import Header from "../components/header";
import Navbar from "../components/navbar";
import bgGradiantImg from "../public/bg.svg";
import CreatePost from "../components/createPost";
import { useRecoilValue } from "recoil";
import addModelState from "../States/addModel";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

interface layoutTypes {
	children: ReactNode;
}

const Layout: FC<layoutTypes> = ({ children }) => {
	//current session
	const { data: session } = useSession();

	// add model state
	const modelState = useRecoilValue(addModelState);

	return (
		<div className="overflow-x-hidden">
			<Head>
				<title>Instagram 2.0</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* background gradiant */}
			<div
				className="fixed top-0 bottom-0 right-0 left-0 -z-10 pointer-events-none select-none"
				style={{ opacity: "30%" }}
			>
				<Image src={bgGradiantImg} layout="fill" objectFit="cover" />
			</div>

			<main className="text-dark w-screen ">
				<Toaster />
				<AnimatePresence>
					{modelState && <CreatePost />}
				</AnimatePresence>
				{session && <Header />}
				{children}
				{session && <Navbar />}
			</main>
		</div>
	);
};

export default Layout;
