import { getMeetings } from "@/lib/meetings-db";
import MeetingCard from "@/components/MeetingCard";

export default function MeetingsPage() {
  // Import directly instead of fetching from localhost
  const meetings = getMeetings();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-slate-800">All Meetings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}
