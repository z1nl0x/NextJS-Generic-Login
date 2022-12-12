// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../libs/connectDB";
import User from "../../../models/User";
// import bcrypt from "bcrypt";

interface ResponseData {
  error?: string;
  msg?: string;
}

const validateEmail = (email: string): boolean => {
  const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regEx.test(email);
};

const validateForm = async (
  username: string,
  email: string,
  password: string
) => {
  if (username.length < 3) {
    return { error: "Username must have 3 or more characters" };
  }
  if (!validateEmail(email)) {
    return { error: "Email inválido!" };
  }

  await dbConnect();
  const emailUser = await User.findOne({ email: email });

  if (emailUser) {
    return { error: "Email já existente!" };
  }

  if (password.length < 5) {
    return { error: "Password deve ter no minimo 5 caracteres!" };
  }

  return null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // validate if it is a POST
  if (req.method === "POST") {
    // get and validate body variables
    const { username, email, password } = req.body;

    const errorMessage = await validateForm(username, email, password);
    if (errorMessage) {
      return res.status(400).json(errorMessage as ResponseData);
    }

    const bcrypt = require("bcrypt");
    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create new User on MongoDB
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    newUser
      .save()
      .then(() =>
        res
          .status(200)
          .json({ msg: "Novo usuário criado com sucesso: " + newUser })
      )
      .catch((err: string) =>
        res.status(400).json({ error: "Error em '/api/register': " + err })
      );
  } else {
    return res
      .status(200)
      .json({ error: "Essa API aceita apenas métodos POST" });
  }
}
