import { connectToDB } from "../../../utils/database";
import User from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { email } = req.body;

      await connectToDB();
      const user = await User.findOne({ email }).select("_id");
      
      return res.status(200).json({ user });
    }

    return res.status(405).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while processing the request." });
  }
};

