import { describe, expect, it } from "vitest";

import { buildLog } from "./log-builder";
import type { LogFields } from "./schemas/fields";
import {
  dummyLogTextLineGenerator,
  dummyLogWithIpAddress,
} from "./utils/testUtils";

describe("log-builder", () => {
  it("should build a log from the lines", () => {
    const logs: LogFields[] = [];
    const generator = dummyLogTextLineGenerator();

    const builder = buildLog(logs);

    for (let i = 0; i < 4; i++) {
      const result = generator.next();
      if (result.value) {
        builder(result.value);
      }
    }

    expect(logs).toEqual([
      dummyLogWithIpAddress("192.168.0.0"),
      dummyLogWithIpAddress("192.168.0.1"),
      dummyLogWithIpAddress("192.168.0.2"),
      dummyLogWithIpAddress("192.168.0.3"),
    ]);
  });
});
