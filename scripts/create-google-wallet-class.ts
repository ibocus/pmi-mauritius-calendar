// One-time setup: creates (or updates) the Google Wallet "generic pass class"
// that defines the chapter-wide look of the card — logo, colors, issuer name.
// Individual member cards ("objects") are created later, per member, embedded
// directly in the save-to-wallet JWT (see lib/google-wallet.ts) — no API call
// needed for those.
//
// Run once after setting GOOGLE_WALLET_ISSUER_ID, GOOGLE_WALLET_CLASS_ID,
// GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL, and GOOGLE_WALLET_PRIVATE_KEY locally:
//   npx dotenv -e .env.local -- npx tsx scripts/create-google-wallet-class.ts

import { GoogleAuth } from "google-auth-library";

async function main() {
  const issuerId = requireEnv("GOOGLE_WALLET_ISSUER_ID");
  const classSuffix = requireEnv("GOOGLE_WALLET_CLASS_ID");
  const clientEmail = requireEnv("GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL");
  const privateKey = requireEnv("GOOGLE_WALLET_PRIVATE_KEY").replace(/\\n/g, "\n");

  const auth = new GoogleAuth({
    credentials: { client_email: clientEmail, private_key: privateKey },
    scopes: ["https://www.googleapis.com/auth/wallet_object.issuer"],
  });
  const client = await auth.getClient();

  const classId = `${issuerId}.${classSuffix}`;
  const genericClass = {
    id: classId,
    issuerName: "PMI Mauritius Chapter",
    classTemplateInfo: {
      cardTemplateOverride: {
        cardRowTemplateInfos: [
          {
            twoItems: {
              startItemTemplateInfo: {
                firstValue: { fields: [{ fieldPath: "object.textModulesData['member_id']" }] },
              },
              endItemTemplateInfo: {
                firstValue: { fields: [{ fieldPath: "object.textModulesData['valid_thru']" }] },
              },
            },
          },
        ],
      },
    },
  };

  const url = `https://walletobjects.googleapis.com/walletobjects/v1/genericClass/${classId}`;

  const getRes = await client.request({ url, method: "GET" }).catch((e) => e.response ?? e);
  const exists = getRes?.status === 200;

  const res = await client.request({
    url: exists
      ? url
      : "https://walletobjects.googleapis.com/walletobjects/v1/genericClass",
    method: exists ? "PUT" : "POST",
    data: genericClass,
  });

  console.log(`${exists ? "Updated" : "Created"} generic class: ${classId}`);
  console.log(res.data);
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
