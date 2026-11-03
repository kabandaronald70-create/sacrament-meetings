import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
      {/* Hero Image */}
      <div className="mb-8 flex justify-center">
        <Image
          src="/church.webp" // <-- Make sure you have an image in your public folder!
          alt="Sacrament Meeting"
          width={600}
          height={400}
          className="rounded-lg shadow-md object-cover"
          priority
        />
      </div>

      <h1 className="text-4xl font-bold mb-4">
        Welcome to the Sacrament Meeting Planner
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        Easily plan, review, and print sacrament meeting agendas for your ward
        or branch.
      </p>

      <Link
        href="/meetings"
        className="bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
      >
        View Upcoming Meetings
      </Link>
    </div>
  );
}
