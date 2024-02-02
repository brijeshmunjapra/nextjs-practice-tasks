import Cart from "@/models/cart";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const {userId} = await request.json();
    try {
        await connectToDB()
        if(!userId){
            return new Response("User is not authorized", {status:404})
        }
        const cartDetails = await Cart.find({ user: userId });
        // const cartDetails = await Cart.find({})
       

        return new Response(JSON.stringify(cartDetails), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all products", { status: 500 })
    }
} 