import { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";

export default async function myRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestIp = require("request-ip");
  const detectedIp = requestIp.getClientIp(req);

  res.status(200).json({ ip: detectedIp });
}
