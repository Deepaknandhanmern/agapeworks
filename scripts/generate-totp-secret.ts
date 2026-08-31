// One-off: generate a new admin 2FA secret. Run once, add the printed
// ADMIN_TOTP_SECRET line to .env.local, scan/enter it into an authenticator
// app, then delete this script.
import { generateTotpSecret, buildOtpauthUri } from "../src/lib/totp";

const secret = generateTotpSecret();

console.log("\nAdd this to .env.local to enable admin 2FA:\n");
console.log(`ADMIN_TOTP_SECRET=${secret}\n`);
console.log("Manual-entry key (for your authenticator app):");
console.log(`  ${secret}\n`);
console.log("Or paste this URI into an authenticator app that supports importing by URI:");
console.log(`  ${buildOtpauthUri(secret)}\n`);
