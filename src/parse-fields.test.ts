import { describe, expect, it } from "vitest";

import { parseFields } from "./parse-fields";
import { ZodError } from "zod";

describe("parseFields", () => {
  it("should parse the log line with no extra fields", () => {
    const line =
      '177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"';

    const { success, data: actual } = parseFields(line);

    expect(success).toBe(true);
    expect(actual).toMatchObject({
      ipAddress: "177.71.128.21",
      remoteLogName: "-",
      userName: "-",
      dateTime: "10/Jul/2018:22:21:28 +0200",
      request: {
        method: "GET",
        resource: "/intranet-analytics/",
        protocol: "HTTP/1.1",
      },
      statusCode: 200,
      responseSize: 3574,
      referer: "-",
      userAgent:
        "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7",
      extraFields: [],
    });
  });

  it("should parse the log line with extra fields", () => {
    const line =
      '72.44.32.10 - admin [09/Jul/2018:15:48:07 +0200] "GET / HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0" junk extra';

    const { success, data: actual } = parseFields(line);

    expect(success).toBe(true);
    expect(actual).toMatchObject({
      ipAddress: "72.44.32.10",
      remoteLogName: "-",
      userName: "admin",
      dateTime: "09/Jul/2018:15:48:07 +0200",
      request: {
        method: "GET",
        resource: "/",
        protocol: "HTTP/1.1",
      },
      statusCode: 200,
      responseSize: 3574,
      referer: "-",
      userAgent:
        "Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0",
      extraFields: ["junk", "extra"],
    });
  });

  it("should return false and a ZodError if the log line is invalid", () => {
    const line = "invalid log line";

    const { success, error } = parseFields(line);

    expect(success).toBe(false);
    expect(error).toBeInstanceOf(ZodError);
  });

  it("should fix issues with preceding 0s in ip address", () => {
    const line =
      '050.000.00.28 - - [11/Jul/2018:15:49:46 +0200] "GET resource HTTP/1.1" 200 3574 "-" "referer header"';

    const { success, data: actual } = parseFields(line);

    expect(success).toBe(true);
    expect(actual?.ipAddress).toBe("50.0.0.28");
  });
});
