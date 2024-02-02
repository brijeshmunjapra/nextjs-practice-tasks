import Cart from "@/models/cart";
import { connectToDB } from "@/utils/database";

export const DELETE = async (request) => {
  
  const { productId } = await request.json();
 
  try {
    await connectToDB();
  
    const cartItem = await Cart.findByIdAndDelete({ _id: productId });
   
    return new Response(cartItem, { status: 201 });
  } catch (error) {
   
    return new Response("Failed to add a product in cart", { status: 500 });
  }
};
