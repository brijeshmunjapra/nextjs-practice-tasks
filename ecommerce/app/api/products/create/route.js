import Product from "@/models/products";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
    const { name, details, price, category } = await request.json();

    try {
        await connectToDB();
        const newProduct = new Product({ name, details, price, category });

        await newProduct.save();
        return new Response(JSON.stringify(newProduct), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new product", { status: 500 });
    }
}
