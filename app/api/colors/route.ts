import {NextResponse} from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://www.csscolorsapi.com/api/colors");

    if (!response.ok) {
      return NextResponse.json({message: "Failed to fetch colors"}, {status: 500});
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    let errorMessage = "An error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({message: errorMessage}, {status: 500});
  }
}