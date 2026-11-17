import { redirect } from "next/navigation";
import { getCurrentMeeting } from "@/lib/meetings-db";
import { connection } from "next/server";

// Tell Next.js this route is allowed to block and be dynamic
export const instant = false;

export default async function CurrentMeetingPage() {
  await connection();

  const meeting = await getCurrentMeeting();

  if (meeting) {
    redirect(`/meetings/${meeting.id}`);
  }

  redirect("/meetings");
}
