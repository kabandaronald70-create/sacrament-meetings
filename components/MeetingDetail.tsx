import type { SacramentMeeting } from "@/lib/types";

export default function MeetingDetail({
  meeting,
}: {
  meeting: SacramentMeeting;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto space-y-6">
      <div className="border-b pb-4 text-center">
        <h2 className="text-3xl font-bold text-slate-800">{meeting.date}</h2>
        <p className="text-gray-500 capitalize">
          {meeting.meetingType} Meeting
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p>
            <strong>Presiding:</strong> {meeting.presiding}
          </p>
          <p>
            <strong>Conducting:</strong> {meeting.conducting}
          </p>
        </div>
        <div>
          <p>
            <strong>Opening Hymn:</strong> #{meeting.openingHymn.number} -{" "}
            {meeting.openingHymn.title}
          </p>
          <p>
            <strong>Opening Prayer:</strong> {meeting.openingPrayer}
          </p>
        </div>
      </div>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <div className="bg-slate-50 p-4 rounded border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-2">Announcements</h3>
          <ul className="list-disc pl-5">
            {meeting.announcements.map((ann, i) => (
              <li key={i}>{ann}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="font-bold text-lg text-slate-800 border-b pb-1 mb-2">
          Ward Business
        </h3>
        {meeting.wardBusiness.length > 0 ? (
          <ul className="list-disc pl-5">
            {meeting.wardBusiness.map((biz, i) => (
              <li key={i}>{biz.description}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No ward business.</p>
        )}
        <p className="mt-2">
          <strong>Stake Business:</strong>{" "}
          {meeting.stakeBusiness ? "Yes" : "No"}
        </p>
      </div>

      <div>
        <h3 className="font-bold text-lg text-slate-800 border-b pb-1 mb-2">
          Sacrament
        </h3>
        <p>
          <strong>Sacrament Hymn:</strong> #{meeting.sacramentHymn.number} -{" "}
          {meeting.sacramentHymn.title}
        </p>
      </div>

      <div>
        <h3 className="font-bold text-lg text-slate-800 border-b pb-1 mb-2">
          Program
        </h3>
        <ul className="space-y-3">
          {meeting.speakers.map((item, i) => (
            <li key={i}>
              {item.type === "speaker" ? (
                <>
                  <strong>{item.name}</strong> — {item.topic}
                </>
              ) : (
                <>
                  <em>Musical Number:</em> {item.name} — {item.topic}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
        <div>
          <p>
            <strong>Closing Hymn:</strong> #{meeting.closingHymn.number} -{" "}
            {meeting.closingHymn.title}
          </p>
        </div>
        <div>
          <p>
            <strong>Closing Prayer:</strong> {meeting.closingPrayer}
          </p>
        </div>
      </div>
    </div>
  );
}
