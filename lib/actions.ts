"use server";

import { z } from "zod";
import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Initialize the Neon client
const sql = neon(process.env.DATABASE_URL!);

// 1. Zod Schema for validation
const MeetingFormSchema = z.object({
  date: z.string().min(1, "Date is required."),
  meetingType: z.enum(["testimony", "regular", "stake", "general", "special"]),
  presiding: z.string().min(2, "Presiding is required."),
  conducting: z.string().min(2, "Conducting is required."),
  openingHymn: z.string().min(1, "Opening hymn is required."),
  openingPrayer: z.string().min(2, "Opening prayer is required."),
  sacramentHymn: z.string().min(1, "Sacrament hymn is required."),
  closingHymn: z.string().min(1, "Closing hymn is required."),
  closingPrayer: z.string().min(2, "Closing prayer is required."),
});

export type State = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    openingHymn?: string[];
    openingPrayer?: string[];
    sacramentHymn?: string[];
    closingHymn?: string[];
    closingPrayer?: string[];
  };
  message?: string | null;
};

// Helper function to format hymns into JSON for the database
function formatHymns(data: Record<string, string>) {
  return {
    opening: JSON.stringify({ number: 0, title: data.openingHymn }),
    sacrament: JSON.stringify({ number: 0, title: data.sacramentHymn }),
    closing: JSON.stringify({ number: 0, title: data.closingHymn }),
  };
}

// 2. CREATE ACTION
export async function createMeeting(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    openingHymn: formData.get("openingHymn"),
    openingPrayer: formData.get("openingPrayer"),
    sacramentHymn: formData.get("sacramentHymn"),
    closingHymn: formData.get("closingHymn"),
    closingPrayer: formData.get("closingPrayer"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to create meeting.",
    };
  }

  const data = validatedFields.data;
  const hymns = formatHymns(data);

  try {
    await sql`
      INSERT INTO meetings (date, meeting_type, presiding, conducting, opening_hymn, opening_prayer, sacrament_hymn, closing_hymn, closing_prayer)
      VALUES (${data.date}, ${data.meetingType}, ${data.presiding}, ${data.conducting}, ${hymns.opening}::jsonb, ${data.openingPrayer}, ${hymns.sacrament}::jsonb, ${hymns.closing}::jsonb, ${data.closingPrayer})
    `;
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to create meeting." };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

// 3. UPDATE ACTION
export async function updateMeeting(
  id: string,
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    openingHymn: formData.get("openingHymn"),
    openingPrayer: formData.get("openingPrayer"),
    sacramentHymn: formData.get("sacramentHymn"),
    closingHymn: formData.get("closingHymn"),
    closingPrayer: formData.get("closingPrayer"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update meeting.",
    };
  }

  const data = validatedFields.data;
  const hymns = formatHymns(data);

  try {
    await sql`
      UPDATE meetings 
      SET 
        date = ${data.date}, 
        meeting_type = ${data.meetingType}, 
        presiding = ${data.presiding}, 
        conducting = ${data.conducting}, 
        opening_hymn = ${hymns.opening}::jsonb, 
        opening_prayer = ${data.openingPrayer}, 
        sacrament_hymn = ${hymns.sacrament}::jsonb, 
        closing_hymn = ${hymns.closing}::jsonb, 
        closing_prayer = ${data.closingPrayer}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to update meeting." };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

// 4. DELETE ACTION
export async function deleteMeeting(id: string) {
  try {
    await sql`DELETE FROM meetings WHERE id = ${id}`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete meeting.");
  }
  revalidatePath("/meetings");
}
