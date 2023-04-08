import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from './lib/mongodb'
import User from '@/models/Users';
import bcrypt from 'bcrypt';
import db from '@/utils/db';
db.connectDb();
export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        // OAuth authentication providers...
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        // Auth0Provider({
        //     clientId: process.env.AUTH0_CLIENT_ID,
        //     clientSecret: process.env.AUTH0_CLIENT_SECRET,
        //     issuer: process.env.AUTH0_ISSUER
        // }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const email = credentials.email;
                const password = credentials.password;
                const user = await User.findOne({ email });
                if (user) {
                    return SignUser(password, user);
                } else {
                    throw new Error("This Account Doesn't Exists");
                }
            }
        })
    ],
    callbacks:{
        //** adding extra info apart from name, email and image to session
        async session({session,token}){
            let user=await User.findById(token.sub);
            session.user._id=token.sub || user._id.toString();
            session.user.role=user.role ||"user";
            return session;
        }
    },
    pages: {
        signIn: '/signin',
        error: '/'
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.JWT_SECRET,
})

const SignUser = async (password, user) => {
    if (!user.password) {
        throw new Error("Please Enter Your Password");
    }
    const testPassword = await bcrypt.compare(password, user.password);
    if (!testPassword) {
        throw new Error("Email or Password is wrong!");
    }
    return user;
};