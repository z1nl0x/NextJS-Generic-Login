import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { json } from "stream/consumers";

interface Data {
  message: string | null;
  payload: {} | null;
}

type userData = {
  _id: string;
  email: string;
  username: string;
  password: string;
  _createdAt: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");
  const cookie = require("cookie");

  if (req.method === "POST") {
    const data = req.body;

    // Estabelecendo conexão com o DB

    const client = await MongoClient.connect(`${process.env.MS}`);
    const db = client.db();

    // Selecionando a collection que irá ser utilizada
    const usersCollection = db.collection("users");

    // Setando a palavra chave que será executada a função de procura na collection
    const query = { email: data.email };

    // Executando procura na collection
    const usertryingLogin = await usersCollection.findOne(query);

    if (usertryingLogin === null) {
      res.status(401).json({ message: "Usuário errado!", payload: null });
    } else {
      // Testando o password
      const validPassword = await bcrypt.compare(
        data.password,
        usertryingLogin.password
      );

      if (!validPassword) {
        res.status(401).json({ message: "Senha inválida", payload: null });
      } else {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1,
            _id: usertryingLogin._id,
          },
          process.env.JWTKEY
        );

        const serialized: any = cookie.serialize("AuthUser", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 1,
          path: "/",
        });

        res.setHeader("Set-Cookie", serialized);

        res
          .status(200)
          .json({ message: "Usuário encontrado!", payload: "success" });
      }
    }

    // res.status(201).json({ message: "Usuário Recuperado com Sucesso!" });
  }
}
