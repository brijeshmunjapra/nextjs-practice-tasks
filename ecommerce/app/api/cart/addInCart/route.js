import Cart from "@/models/cart";
import Product from "@/models/products";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { name, productId, qty, userId } = await request.json();

  try {
    await connectToDB();
    const products = await Product.find({});
    const existingItemIncart = await Cart.findOne({ name });

    if (existingItemIncart) {
      existingItemIncart.qty += qty;
      await existingItemIncart.save();
      return new Response(existingItemIncart, { status: 200 });
    } else {
      const temp = products?.filter((product) => product?._id == productId)[0];

      if (!userId || !temp) {
        return new Response("Details are incomplete", { status: 404 });
      }

     
      const productToBeAdded = new Cart({
        user: userId,
        name: temp.name,
        details: temp.details,
        price: temp.price,
        category: temp.category,
        qty,
      });
      await productToBeAdded.save();

      return new Response(productToBeAdded, { status: 201 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Failed to add a product in cart", { status: 500 });
  }
};
