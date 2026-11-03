import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";
import { connection } from "next/server";

// Tell Next.js this route is allowed to block and be dynamic
export const instant = false;

export default async function CurrentMeetingPage() {
  await connection();

  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const isoDate = sunday.toISOString().split("T")[0];
  const meetings = getMeetings(isoDate);

  if (meetings.length > 0) {
    redirect(`/meetings/${meetings[0].id}`);
  }

  redirect("/meetings");
}
