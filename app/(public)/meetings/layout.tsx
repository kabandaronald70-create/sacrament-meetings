import NavLinks from "@/components/NavLinks";

// Tell Next.js to allow this layout to block during build
export const instant = false;

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavLinks />
      <div className="container mx-auto px-4 py-8">{children}</div>
    </section>
  );
}
