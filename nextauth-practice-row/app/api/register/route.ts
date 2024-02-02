import { connectToDB } from "../../../utils/database";
import User from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { name, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      await connectToDB();
      await User.create({ name, email, password: hashedPassword });

      return res.status(201).json({ message: "User registered." });
    }

    
    return res.status(405).end(); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while registering the user." });
  }
};

export { handler as POST };