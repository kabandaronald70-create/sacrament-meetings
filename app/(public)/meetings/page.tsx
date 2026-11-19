import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";
import { MeetingSearch } from "@/components/MeetingSearch";
import MeetingCard from "@/components/MeetingCard";
import { Pagination } from "@/components/Pagination";
import { deleteMeeting } from "@/lib/actions";
import Link from "next/link";

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">All Meetings</h2>
        <Link
          href="/meetings/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-semibold"
        >
          + Create Meeting
        </Link>
      </div>

      <MeetingSearch />

      {meetings.length === 0 ? (
        <p className="text-gray-500">No meetings found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {meetings.map((m) => (
            <div key={m.id} className="flex flex-col gap-2">
              <MeetingCard meeting={m} />

              {/* Edit and Delete Buttons */}
              <div className="flex justify-end gap-4 px-2">
                <Link
                  href={`/meetings/${m.id}/edit`}
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await deleteMeeting(m.id.toString());
                  }}
                >
                  <button
                    type="submit"
                    className="text-sm font-semibold text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination totalPages={totalPages} />
    </div>
  );
}
