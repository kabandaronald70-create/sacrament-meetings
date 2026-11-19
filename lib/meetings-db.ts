import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const sql = neon(process.env.DATABASE_URL!);

// Helper to safely format the date
function formatDateString(date: unknown): string {
  if (typeof date === "string") return date.split("T")[0];
  if (date instanceof Date) return date.toISOString().split("T")[0];
  return "";
}

// Helper to map the database row (snake_case) to the TypeScript interface (camelCase)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbRowToMeeting(row: any): SacramentMeeting {
  // Neon sometimes returns JSONB as a string, so we parse it if needed
  const parseJson = (data: unknown, fallback: unknown) => {
    if (!data) return fallback;
    if (typeof data === "string") {
      try {
        return JSON.parse(data);
      } catch {
        return fallback;
      }
    }
    return data;
  };

  return {
    id: row.id,
    date: formatDateString(row.date),
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements || [],
    // Safely parse JSONB fields with fallbacks
    openingHymn: parseJson(row.opening_hymn, { number: 0, title: "TBD" }),
    openingPrayer: row.opening_prayer,
    wardBusiness: parseJson(row.ward_business, []),
    stakeBusiness: row.stake_business,
    sacramentHymn: parseJson(row.sacrament_hymn, { number: 0, title: "TBD" }),
    speakers: parseJson(row.speakers, []),
    closingHymn: parseJson(row.closing_hymn, { number: 0, title: "TBD" }),
    closingPrayer: row.closing_prayer,
  };
}

export async function getMeetings(
  query?: string,
  page: number = 1,
): Promise<SacramentMeeting[]> {
  const limit = 5;
  const offset = (page - 1) * limit;

  let rows;
  if (query) {
    const searchTerm = `%${query}%`;
    rows = await sql`
      SELECT * FROM meetings 
      WHERE presiding ILIKE ${searchTerm} 
         OR conducting ILIKE ${searchTerm} 
         OR meeting_type ILIKE ${searchTerm}
         OR speakers::text ILIKE ${searchTerm}
      ORDER BY date DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  } else {
    rows = await sql`
      SELECT * FROM meetings ORDER BY date DESC LIMIT ${limit} OFFSET ${offset}
    `;
  }

  // Map the raw rows to the proper interface
  return rows.map(mapDbRowToMeeting);
}

export async function getMeetingsTotalPages(query?: string): Promise<number> {
  const limit = 5;
  let count;

  if (query) {
    const searchTerm = `%${query}%`;
    const res = await sql`
      SELECT COUNT(*) FROM meetings 
      WHERE presiding ILIKE ${searchTerm} 
         OR conducting ILIKE ${searchTerm} 
         OR meeting_type ILIKE ${searchTerm}
         OR speakers::text ILIKE ${searchTerm}
    `;
    count = Number(res[0].count);
  } else {
    const res = await sql`SELECT COUNT(*) FROM meetings`;
    count = Number(res[0].count);
  }

  return Math.ceil(count / limit);
}

export async function getMeetingById(
  id: number,
): Promise<SacramentMeeting | null> {
  const rows = await sql`SELECT * FROM meetings WHERE id = ${id}`;
  if (!rows[0]) return null;

  // Map the single row to the proper interface
  return mapDbRowToMeeting(rows[0]);
}

export async function getCurrentMeeting(): Promise<SacramentMeeting | null> {
  const today = new Date();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay());
  const dateStr = sunday.toISOString().split("T")[0];

  const rows = await sql`SELECT * FROM meetings WHERE date = ${dateStr}`;
  if (!rows[0]) return null;

  // Map the single row to the proper interface
  return mapDbRowToMeeting(rows[0]);
}
