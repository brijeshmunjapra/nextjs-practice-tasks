import { connectToDB } from "@/utils/database";
import Order from "@/models/order";

export const POST = async (request) => {
  const {userId} = await request.json();
    try {
        await connectToDB()
        if(!userId){
            return new Response("User is not authorized", {status:404})
        }
        const orders = await Order.find({ user: userId });
       

        return new Response(JSON.stringify(orders), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch orders", { status: 500 })
    }
} 