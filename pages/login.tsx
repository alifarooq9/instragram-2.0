import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import googleIcon from "../public/google.png";
import { signIn, getSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	if (session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
		},
	};
};

const Login: NextPage = () => {
	return (
		<main className="w-screen min-h-screen flex flex-col justify-center items-center">
			<h1 className="font text-5xl">Instagram</h1>
			<button
				onClick={() =>
					signIn("google", { redirect: true, callbackUrl: "/" })
				}
				className="mt-16 bg-white w-72 h-16 shadow-lg rounded-3xl hover:scale-110 duration-300 space-x-2 flex justify-center items-center"
			>
				<Image src={googleIcon} objectFit="contain" width={"20px"} />
				<span className="font-semibold opacity-70">Google</span>
			</button>
		</main>
	);
};

export default Login;
