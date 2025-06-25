import { join } from "node:path";
import { createReadStream } from "node:fs";
import readline from "node:readline";

import {
  buildLog,
  totalUniqueIPAddress,
  topVisitedURLs,
  toActiveIPAddress,
} from "./log-builder";
import type { LogFields } from "./schemas/fields";

const fileName = process.argv.slice(2)?.[0];
if (!fileName) {
  console.log("\x1b[31mError: Log file not provided\x1b[0m");
  process.exit(-1);
}

const filePath = join(process.cwd(), fileName);

const fileStream = createReadStream(filePath);

const reader = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity, // Recognize all instances of CR LF ('\r\n') as a single line break
});

const logs: LogFields[] = [];
reader.on("line", buildLog(logs));

reader.on("error", () => {
  console.log(`\x1b[31mError reading file ${filePath}\x1b[0m`);
  process.exit(-1);
});

reader.on("close", () => {
  console.log(`Successfully read ${logs.length} logs`);
  console.log(`Total unique IP addresses: ${totalUniqueIPAddress(logs)}`);
  console.log(`Top 3 most visited URLs: ${topVisitedURLs(logs, 3)}`);
  console.log(`Top 3 most active IP addresses: ${toActiveIPAddress(logs, 3)}`);
});
