import { describe, expect, it } from "vitest";

import {
  topVisitedURLs,
  totalUniqueIPAddresses,
  topActiveIPAddress,
} from "./queries";
import { dummyLogWithIpAddress, dummyLogWithResource } from "./utils/testUtils";

describe("queries", () => {
  it("should return the total number of unique IP addresses", () => {
    const logs = [
      dummyLogWithIpAddress("192.168.1.1"),
      dummyLogWithIpAddress("192.168.1.2"),
      dummyLogWithIpAddress("192.168.1.3"),
      dummyLogWithIpAddress("192.168.1.1"),
    ];

    const result = totalUniqueIPAddresses(logs);

    expect(result).toBe(3);
  });

  it("should return the top n most visited URLs with a successful status code (200)", () => {
    const logs = [
      dummyLogWithResource("/one"),
      dummyLogWithResource("/one", 500),
      dummyLogWithResource("/two"),
      dummyLogWithResource("/two"),
      dummyLogWithResource("/three", 404),
      dummyLogWithResource("/three", 301),
      dummyLogWithResource("/three"),
      dummyLogWithResource("/four", 200),
      dummyLogWithResource("/four"),
      dummyLogWithResource("/four"),
    ];

    const result = topVisitedURLs(logs, 2);

    expect(result).toEqual(["/four (3)", "/two (2)"]);
  });

  it("should return the top n most active IP addresses", () => {
    const logs = [
      dummyLogWithIpAddress("192.168.1.1"),
      dummyLogWithIpAddress("192.168.1.2"),
      dummyLogWithIpAddress("192.168.1.3"),
      dummyLogWithIpAddress("192.168.1.2"),
      dummyLogWithIpAddress("192.168.1.3"),
      dummyLogWithIpAddress("192.168.1.3"),
    ];

    const result = topActiveIPAddress(logs, 2);

    expect(result).toEqual(["192.168.1.3 (3)", "192.168.1.2 (2)"]);
  });
});
