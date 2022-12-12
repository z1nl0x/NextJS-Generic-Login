import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../libs/mongodb";
import dbConnect from "../../../libs/connectDB";
import User from "../../../models/User";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const bcrypt = require("bcrypt");

        await dbConnect();

        // Find user with the email
        const user = await User.findOne({
          email: email,
        });

        // Email Not found
        if (!user) {
          throw new Error("Email ou senha não encontrado!");
        }

        // Check hased password with DB hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        // Incorrect password
        if (!isPasswordCorrect) {
          throw new Error("Email ou senha não encontrado!");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/index",
    // error: "/error-page",
    // signOut: "/signOut-page"
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);
