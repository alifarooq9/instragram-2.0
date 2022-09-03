import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Feed from "../components/feed";
import { server } from "../config/index";
import postModelState from "../States/postModel";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				permanent: false,
				destination: "/login",
			},
		};
	}

	const posts = await fetch(`${server}/api/post/fetch`, {
		method: "GET",
	}).then((res) => res.json());

	console.log(posts);

	return {
		props: {
			session,
			postsResult: posts.result,
		},
	};
};

const Home: NextPage = ({ postsResult }: any) => {
	const [posts, setPosts] = useRecoilState(postModelState);
	useEffect(() => {
		setPosts(postsResult);
	}, []);
	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
			<Head>
				<title>Instagram 2.0</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="w-screen">
				<Feed />
			</main>
		</div>
	);
};

export default Home;
