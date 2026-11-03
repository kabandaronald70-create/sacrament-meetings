import type { SacramentMeeting } from "./types";

export const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-05-03",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Sister Williams",
    wardBusiness: [{ description: "Sustaining of new Primary president" }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: "Sister Brown", topic: "Faith in Jesus Christ", type: "speaker" },
      { name: "Youth Choir", topic: "", type: "musical-number" },
      { name: "Brother Green", topic: "The power of prayer", type: "speaker" },
    ],
    closingHymn: { number: 31, title: "O God, Our Help in Ages Past" },
    closingPrayer: "Brother Davis",
    announcements: ["Ward temple night: May 10"],
  },
  {
    id: 2,
    date: "2026-05-10",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Bishop Smith",
    openingHymn: { number: 85, title: "How Firm a Foundation" },
    openingPrayer: "Brother Taylor",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 172,
      title: "Tis Sweet to Sing the Matchless Love",
    },
    speakers: [{ name: "Congregation", topic: "Testimonies", type: "speaker" }],
    closingHymn: { number: 152, title: "Rise Up, O Men of God" },
    closingPrayer: "Sister Adams",
    announcements: ["Fast Sunday - no ward business"],
  },
  {
    id: 3,
    date: "2026-05-17",
    meetingType: "regular",
    presiding: "Brother Johnson (Stake Presidency)",
    conducting: "Bishop Smith",
    openingHymn: { number: 5, title: "High on the Mountain Top" },
    openingPrayer: "Brother White",
    wardBusiness: [
      { description: "Release of Elders Quorum president" },
      { description: "Calling of new Elders Quorum president" },
    ],
    stakeBusiness: true,
    sacramentHymn: { number: 190, title: "In Memory of the Crucified" },
    speakers: [
      {
        name: "Sister Garcia",
        topic: "Faith in times of trial",
        type: "speaker",
      },
      {
        name: "Primary Children",
        topic: "I Am a Child of God",
        type: "musical-number",
      },
      {
        name: "Brother Martinez",
        topic: "Following the Prophet",
        type: "speaker",
      },
    ],
    closingHymn: { number: 19, title: "We Thank Thee, O God, for a Prophet" },
    closingPrayer: "Sister Lee",
    announcements: ["Stake Conference next week"],
  },
  {
    id: 4,
    date: "2026-05-24",
    meetingType: "stake",
    presiding: "Stake President",
    conducting: "Stake President",
    openingHymn: { number: 68, title: "Israel, Israel, God is Calling" },
    openingPrayer: "Brother Clark",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 1, title: "The Morning Breaks" },
    speakers: [
      {
        name: "Stake President",
        topic: "Stake Conference Address",
        type: "speaker",
      },
      {
        name: "Sister Thompson",
        topic: "Stake Relief Society Address",
        type: "speaker",
      },
    ],
    closingHymn: { number: 243, title: "Let Us All Press On" },
    closingPrayer: "Sister Hall",
    announcements: ["This is a Stake Conference broadcast"],
  },
  {
    id: 5,
    date: "2026-05-31",
    meetingType: "general",
    presiding: "Bishop Smith",
    conducting: "Bishop Smith",
    openingHymn: { number: 60, title: "Battle Hymn of the Republic" },
    openingPrayer: "Brother Young",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 174, title: "While of These Emblems We Partake" },
    speakers: [
      {
        name: "General Authority",
        topic: "General Conference Broadcast",
        type: "speaker",
      },
    ],
    closingHymn: { number: 27, title: "Joseph Smith’s First Prayer" },
    closingPrayer: "Sister King",
    announcements: ["View the General Conference broadcast at home"],
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter((m) => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((m) => m.id === id) ?? null;
}
