import Cart from "@/models/cart";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { payload } = await request.json();

  try {
    await connectToDB();
   
    const cartItem = await Cart.findOne({ _id: payload?.productId });
    if (!cartItem) {
      return new Response(
        { message: "Product not found in the cart." },
        { status: 404 }
      );
    }

    cartItem.qty += 1;

    await cartItem.save();

    return new Response(cartItem, { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to add qty", { status: 500 });
  }
};
