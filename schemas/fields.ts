import { z } from "zod";

export const fields = z.object({
  ipAddress: z.string(),
  remoteLogName: z.string().default("-"),
  userName: z.string().default("-"),
  dateTime: z.string(),
  request: z.object({
    method: z.string(),
    resource: z.string(),
    protocol: z.string(),
  }),
  statusCode: z.string(),
  responseSize: z.string(),
  referer: z.string(),
  userAgent: z.string().default("-"),
  extraFields: z.array(z.string()).default([]),
});
