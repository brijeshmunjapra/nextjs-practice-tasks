// import Cart from "@/models/cart";
import Product from "@/models/products";
import Order from "@/models/order";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { items, totalPrice, userId } = await request.json();

  try {
    await connectToDB();
    if (!userId) {
      return new Response("Details are incomplete", { status: 404 });
    }

    const productToBeAdded = new Order({
      user: userId,
      items,
      totalPrice,
    });
    await productToBeAdded.save();

    return new Response(productToBeAdded, { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create order", { status: 500 });
  }
};
