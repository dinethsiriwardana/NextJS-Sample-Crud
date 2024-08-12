import dbConnect from "@/app/database/database";
import Product from "@/app/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Assuming the request body contains product data
    const { name, description, price } = await req.json();

    // Create a new product instance
    const newProduct = new Product({
      name,
      description,
      price,
    });

    // Save the new product to the database
    await newProduct.save();

    // Return the newly created product
    return NextResponse.json(newProduct);
  } catch (err: any) {
    // Handle any errors that occur during the process
    return NextResponse.json({ error: err.message });
  }
}
