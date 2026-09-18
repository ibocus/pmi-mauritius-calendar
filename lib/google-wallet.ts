import jwt from "jsonwebtoken";

interface GoogleWalletConfig {
  issuerId: string;
  classId: string;
  serviceAccountEmail: string;
  privateKey: string;
}

export function getGoogleWalletConfig(): GoogleWalletConfig | null {
  const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID;
  const classId = process.env.GOOGLE_WALLET_CLASS_ID;
  const serviceAccountEmail = process.env.GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_WALLET_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!issuerId || !classId || !serviceAccountEmail || !privateKey) return null;
  return { issuerId, classId, serviceAccountEmail, privateKey };
}

interface SampleMember {
  memberId: string;
  name: string;
  memberSince: string;
  validThru: string;
}

// Builds a "Save to Google Wallet" link for a generic pass object. The pass
// class (chapter-wide styling: logo, colors, title) must exist already —
// see scripts/create-google-wallet-class.ts, run once during setup. The
// object (this specific card) is embedded in the JWT and created on save,
// so no API call is needed per member.
export function buildGoogleWalletSaveUrl(config: GoogleWalletConfig, member: SampleMember) {
  const objectId = `${config.issuerId}.${member.memberId}`;

  const genericObject = {
    id: objectId,
    classId: `${config.issuerId}.${config.classId}`,
    state: "ACTIVE",
    cardTitle: { defaultValue: { language: "en", value: "PMI Mauritius Chapter" } },
    header: { defaultValue: { language: "en", value: member.name } },
    subheader: { defaultValue: { language: "en", value: "Digital Membership Card" } },
    textModulesData: [
      { id: "member_id", header: "MEMBER ID", body: member.memberId },
      { id: "member_since", header: "MEMBER SINCE", body: member.memberSince },
      { id: "valid_thru", header: "VALID THRU", body: member.validThru },
    ],
    hexBackgroundColor: "#1d4ed8",
  };

  const payload = {
    iss: config.serviceAccountEmail,
    aud: "google",
    typ: "savetowallet",
    iat: Math.floor(Date.now() / 1000),
    payload: { genericObjects: [genericObject] },
  };

  const token = jwt.sign(payload, config.privateKey, { algorithm: "RS256" });
  return `https://pay.google.com/gp/v/save/${token}`;
}
