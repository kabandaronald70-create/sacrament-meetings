import { getMeetings } from "@/lib/meetings-db";

// GET /api/meetings
// GET /api/meetings?date=2026-05-03
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  const meetings = getMeetings(date);
  return Response.json(meetings);
}
