// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

interface Data {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const bcrypt = require("bcrypt");
  const saltRounds = 7;
  // const myPlaintextPassword = "teste";

  if (req.method === "POST") {
    const data = req.body;

    bcrypt.hash(
      data.password,
      saltRounds,
      function (err: string, hash: string) {
        const hashPswd = hash;
        data.password = hashPswd;
      }
    );

    const client = await MongoClient.connect(`${process.env.MS}`);
    const db = client.db();

    const usersCollection = db.collection("users");
    const result = await usersCollection.insertOne(data);

    console.log(`${result}`);

    client.close();

    res.status(201).json({ message: "Usuário Inserido!" });
  }
}
