import JokeModel from "@/app/models/Joke";
import { dbConnect } from "@/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const jokes = await JokeModel.find();
    return NextResponse.json({ jokes }, { status: 200 });
  } catch (error) {
    console.log("Error fetching jokes", error);
    return NextResponse.json(
      { message: "Error fetching jokes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { setup, punchline, type, rating } = await request.json();
    await JokeModel.create({ setup, punchline, type, rating });
    return NextResponse.json({ message: "Joke created" }, { status: 201 });
  } catch (error) {
    console.log("Error creating joke", error);
    return NextResponse.json(
      { message: "Error creating joke" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const { id } = await request.json();
    await JokeModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Joke deleted" }, { status: 200 });
  } catch (error) {
    console.log("Error deleting joke", error);
    return NextResponse.json(
      { message: "Error deleting joke" },
      { status: 500 }
    );
  }
}
