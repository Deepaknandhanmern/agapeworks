import {
  getAllViviraDownloadLeadsForDashboard,
  getAllViviraReleasesForDashboard,
} from "@/lib/data/dashboard";
import { deleteViviraDownloadLeadAction } from "@/lib/actions/vivira-actions";
import { DeleteButton } from "../delete-button";
import { UploadReleaseForm } from "./upload-release-form";

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function ViviraPage() {
  const [leads, releases] = await Promise.all([
    getAllViviraDownloadLeadsForDashboard(),
    getAllViviraReleasesForDashboard(),
  ]);
  const currentRelease = releases[0];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="mb-6 text-2xl font-semibold text-foreground">Vivira</h1>

        <UploadReleaseForm />

        {currentRelease ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Current release: <span className="font-medium text-foreground">{currentRelease.fileName}</span>{" "}
            ({formatSize(currentRelease.sizeBytes)}) - uploaded{" "}
            {currentRelease.uploadedAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            No release uploaded yet - the download button on /products falls back to the static
            placeholder path until one is.
          </p>
        )}

        {releases.length > 1 && (
          <details className="mt-4 text-sm text-muted-foreground">
            <summary className="cursor-pointer font-medium text-foreground">
              Previous releases ({releases.length - 1})
            </summary>
            <ul className="mt-2 space-y-1">
              {releases.slice(1).map((release) => (
                <li key={release.id}>
                  {release.fileName} ({formatSize(release.sizeBytes)}) -{" "}
                  {release.uploadedAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>

      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Downloads</h2>
          {leads.length > 0 && (
            <a
              href="/api/vivira-download-lead/export"
              className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
            >
              Export CSV
            </a>
          )}
        </div>

        <div className="overflow-hidden rounded-xl border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Downloaded</th>
                <th className="p-4 font-medium" />
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b last:border-0">
                  <td className="p-4 font-medium text-foreground">{lead.name}</td>
                  <td className="p-4 text-muted-foreground">{lead.email}</td>
                  <td className="p-4 text-muted-foreground">
                    {lead.createdAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="p-4 text-right">
                    <DeleteButton
                      action={deleteViviraDownloadLeadAction.bind(null, lead.id)}
                      label={lead.email}
                    />
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">
                    No downloads yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
