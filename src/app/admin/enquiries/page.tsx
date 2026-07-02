import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin";
import { getEnquiries } from "@/lib/enquiry-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const enquiries = await getEnquiries();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-brand-red">Catering Enquiries</h1>
          <p className="text-sm text-brand-ink/70">
            View submitted catering and contact forms ({enquiries.length} total)
          </p>
        </div>
      </div>

      <div className="ornate-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-brand-gold/10 text-left text-xs uppercase tracking-wider text-brand-ink/70">
              <tr>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Event Details</th>
                <th className="px-4 py-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-brand-ink/60">
                    No enquiries received yet.
                  </td>
                </tr>
              )}
              {enquiries.map((e) => (
                <tr key={e.id || e.createdAt} className="border-t border-brand-gold/20 align-top">
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-brand-ink/80">
                    {e.createdAt
                      ? new Date(e.createdAt).toLocaleString("en-AU", {
                          timeZone: "Australia/Melbourne",
                        })
                      : "—"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-medium text-brand-ink">{e.name || "—"}</div>
                    <div className="text-xs text-brand-ink/60">
                      <a href={`tel:${e.phone}`} className="hover:underline hover:text-brand-red">
                        {e.phone}
                      </a>
                    </div>
                    <div className="text-xs text-brand-ink/60">
                      <a href={`mailto:${e.email}`} className="hover:underline hover:text-brand-red">
                        {e.email}
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-brand-ink/80">
                      <strong>Date:</strong> {e.eventDate || "—"}
                    </div>
                    <div className="text-xs text-brand-ink/80">
                      <strong>Guests:</strong> {e.guests || "—"}
                    </div>
                    <div className="text-xs text-brand-ink/80 capitalize">
                      <strong>Type:</strong> {e.eventType || "—"}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-brand-ink/80 max-w-md">
                    {e.message ? (
                      <p className="whitespace-pre-wrap break-words leading-relaxed font-sans">
                        {e.message}
                      </p>
                    ) : (
                      <span className="text-brand-ink/40 italic">No message provided</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
