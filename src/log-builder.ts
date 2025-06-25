import { parseFields } from "./parse-fields";
import type { LogFields } from "./schemas/fields";

export const buildLog = (logs: LogFields[]) => (line: string) => {
  const { success, data } = parseFields(line);
  if (success) {
    logs.push(data);
  }
};

export const totalUniqueIPAddress = (logs: LogFields[]) => 5;

export const topVisitedURLs = (logs: LogFields[], n: number) => 4;

export const toActiveIPAddress = (logs: LogFields[], n: number) => 3;
