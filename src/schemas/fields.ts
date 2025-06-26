import { z } from "zod";

const removePrecedingZerosFromIpAddress = (ip: string) =>
  ip
    .split(".")
    .map((digit) => parseInt(digit, 10).toString())
    .join(".");

export const fields = z.object({
  ipAddress: z.string().transform(removePrecedingZerosFromIpAddress),
  remoteLogName: z.string().default("-"),
  userName: z.string().default("-"),
  dateTime: z.string(),
  request: z.object({
    method: z.string(),
    resource: z.string(),
    protocol: z.string(),
  }),
  statusCode: z.coerce.number(),
  responseSize: z.coerce.number(),
  referer: z.string(),
  userAgent: z.string().default("-"),
  extraFields: z.array(z.string()).default([]),
});

export type LogFields = z.infer<typeof fields>;
