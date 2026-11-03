import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

export default function MeetingCard({
  meeting,
}: {
  meeting: SacramentMeeting;
}) {
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
      <h2 className="text-xl font-bold text-slate-800 mb-2">{meeting.date}</h2>
      <p className="text-sm text-gray-600 mb-1 capitalize">
        Type: {meeting.meetingType}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Presiding: {meeting.presiding}
      </p>
      <Link
        href={`/meetings/${meeting.id}`}
        className="text-blue-600 font-semibold hover:underline"
      >
        View Agenda &rarr;
      </Link>
    </div>
  );
}
