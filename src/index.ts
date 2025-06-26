import { join } from "node:path";

import { readFileByLine } from "./reader";
import { buildLog } from "./log-builder";
import {
  totalUniqueIPAddresses,
  topVisitedURLs,
  topActiveIPAddress,
} from "./queries";
import type { LogFields } from "./schemas/fields";

const fileName = process.argv.slice(2)?.[0];
if (!fileName) {
  console.log("\x1b[31mError: Log file not provided\x1b[0m");
  process.exit(-1);
}

const filePath = join(process.cwd(), fileName);

const logs: LogFields[] = [];

readFileByLine(filePath, buildLog(logs), () => {
  console.log(`Successfully read ${logs.length} logs`);
  console.log(`Total unique IP addresses: ${totalUniqueIPAddresses(logs)}`);
  console.log(`Top 3 most visited URLs: ${topVisitedURLs(logs, 3)}`);
  console.log(`Top 3 most active IP addresses: ${topActiveIPAddress(logs, 3)}`);
});
