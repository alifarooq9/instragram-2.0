import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../utils/db";
import GoogleProvider from "next-auth/providers/google";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	adapter: MongoDBAdapter(clientPromise),
	secret: process.env.JWT_SECRET,
	session: {
		// Set to jwt in order to CredentialsProvider works properly
		strategy: "jwt",
	},
	pages: {
		signIn: "/login",
	},
	callbacks: {
		jwt: async ({ token, user }) => {
			user && (token.user = user);

			return token;
		},
		session: async ({ session, token }) => {
			session.user = token.user; // Setting token in session

			return session;
		},
	},
});
