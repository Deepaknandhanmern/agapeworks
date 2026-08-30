import "server-only";

/** Escapes user-supplied text before interpolating into email HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Shared black-and-white branded shell for every transactional email —
 * matches the site's own minimal palette (see globals.css --primary/--foreground)
 * rather than introducing a separate "email brand."
 */
export function emailLayout(input: {
  preheader: string;
  bodyHtml: string;
  ctaLabel?: string;
  ctaUrl?: string;
}): string {
  const cta =
    input.ctaLabel && input.ctaUrl
      ? `<tr><td style="padding-top:8px;">
           <a href="${input.ctaUrl}" style="display:inline-block;background:#000000;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 20px;border-radius:8px;">
             ${escapeHtml(input.ctaLabel)}
           </a>
         </td></tr>`
      : "";

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <span style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(input.preheader)}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e5e5;">
            <tr>
              <td style="padding:24px 32px;border-bottom:1px solid #eeeeee;">
                <span style="font-size:17px;font-weight:700;letter-spacing:-0.02em;color:#000000;">Agape Works</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr><td>${input.bodyHtml}</td></tr>
                  ${cta}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px;background:#fafafa;border-top:1px solid #eeeeee;">
                <p style="margin:0;font-size:12px;color:#888888;">Agape Works — product engineering &amp; consulting</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
