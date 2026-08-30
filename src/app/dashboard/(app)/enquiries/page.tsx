import { getAllEnquiriesForDashboard } from "@/lib/data/dashboard";
import { EnquiryRow } from "./enquiry-row";

export default async function DashboardEnquiriesPage() {
  const enquiries = await getAllEnquiriesForDashboard();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-foreground">Enquiries</h1>

      <div className="flex flex-col gap-4">
        {enquiries.map((enquiry) => (
          <EnquiryRow key={enquiry.id} enquiry={enquiry} />
        ))}
        {enquiries.length === 0 && (
          <p className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
            No enquiries yet.
          </p>
        )}
      </div>
    </div>
  );
}
