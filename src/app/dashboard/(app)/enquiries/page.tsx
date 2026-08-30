import { getAllEnquiriesForDashboard } from "@/lib/data/dashboard";
import { EnquiryKanban } from "@/components/dashboard/enquiry-kanban";

export default async function DashboardEnquiriesPage() {
  const enquiries = await getAllEnquiriesForDashboard();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-foreground">Enquiries</h1>

      {enquiries.length === 0 ? (
        <p className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
          No enquiries yet.
        </p>
      ) : (
        <EnquiryKanban enquiries={enquiries} />
      )}
    </div>
  );
}
