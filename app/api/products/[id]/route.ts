import dbConnect from "@/app/database/database";
import Product from "@/app/models/Product";
import { NextRequest, NextResponse } from "next/server";

// Define the Params interface
interface Params {
  id: string;
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    await dbConnect();

    // Now TypeScript knows `params` is of type `Params`
    // Extract the product ID from the request URL parameters
    const { id } = params;

    // Perform the deletion operation
    const result = await Product.deleteOne({ _id: id });

    // Check if the product was successfully deleted
    if (result.deletedCount > 0) {
      // Return a success response
      return NextResponse.json({ message: "Product deleted successfully" });
    } else {
      // If no products were deleted, return a not found response
      return NextResponse.json("Product not found", { status: 200 });
    }
  } catch (err: any) {
    // Handle any errors that occur during the process
    return NextResponse.json({ error: err.message });
  }
}
