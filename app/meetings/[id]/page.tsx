import { getMeetingById } from "@/lib/meetings-db";
import MeetingDetail from "@/components/MeetingDetail";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  if (Number.isNaN(id)) return notFound();

  // Fetch directly from the database import, not via localhost fetch
  const meeting = getMeetingById(id);

  if (!meeting) return notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href="/meetings" className="text-blue-600 hover:underline">
          &larr; Back to all meetings
        </Link>
      </div>
      <MeetingDetail meeting={meeting} />
    </div>
  );
}
