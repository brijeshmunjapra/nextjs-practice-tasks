import Cart from "@/models/cart";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  
  const { userId } = await request.json();
  console.log(userId, "userId to delete all cart items")
  try {
    await connectToDB();
  
    const result = await Cart.deleteMany({ user: userId });

  
      return new Response({ message: 'done' }, { status: 201 });
    
     
  } catch (error) {
     console.log(error.message, "error during empty cart")
    return new Response("Failed to add empty the cart", { status: 500 });
  }
};
