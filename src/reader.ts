import { createReadStream } from "node:fs";
import readline from "node:readline";

export const readFileByLine = (
  filePath: string,
  onReadLine: (line: string) => void,
  onDone: () => void
) => {
  const fileStream = createReadStream(filePath);

  const reader = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Recognize all instances of CR LF ('\r\n') as a single line break
  });

  reader.on("line", onReadLine);

  reader.on("error", () => {
    console.log(`\x1b[31mError reading file ${filePath}\x1b[0m`);
    process.exit(-1);
  });

  reader.on("close", onDone);
};
