import { getMeetings } from "@/lib/meetings-db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get("date");
  // Note: For this assignment, we just return all if no date is passed.
  // If you need date filtering, adjust the DB function.
  const meetings = await getMeetings();
  return Response.json(meetings);
}
