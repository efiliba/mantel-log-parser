import { parseFields } from "./parse-fields";
import type { LogFields } from "./schemas/fields";

export const buildLog = (logs: LogFields[]) => (line: string) => {
  const { success, data } = parseFields(line);
  if (success) {
    logs.push(data);
  }
};
