import { Resend } from "resend";

interface ResendConnectionSettings {
  api_key: string;
  from_email?: string;
}

let cachedSettings: ResendConnectionSettings | null = null;

async function fetchConnectionSettings(): Promise<ResendConnectionSettings> {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? "depl " + process.env.WEB_REPL_RENEWAL
      : null;

  if (!hostname || !xReplitToken) {
    throw new Error("Replit connector credentials not available");
  }

  const res = await fetch(
    `https://${hostname}/api/v2/connection?include_secrets=true&connector_names=resend`,
    {
      headers: {
        Accept: "application/json",
        "X-Replit-Token": xReplitToken,
      },
    },
  );
  const data = (await res.json()) as { items?: Array<{ settings: ResendConnectionSettings }> };
  const item = data.items?.[0];
  if (!item || !item.settings?.api_key) {
    throw new Error("Resend not connected");
  }
  return item.settings;
}

export async function getResend() {
  // Refresh settings each call — tokens may rotate
  const settings = await fetchConnectionSettings();
  cachedSettings = settings;
  return {
    client: new Resend(settings.api_key),
    fromEmail: settings.from_email || "onboarding@resend.dev",
  };
}

export function getCachedFromEmail(): string | null {
  return cachedSettings?.from_email ?? null;
}
