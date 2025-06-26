const dummyLog = {
  ipAddress: "0.0.0.0",
  remoteLogName: "remoteLogName",
  userName: "userName",
  dateTime: "dateTime",
  request: { method: "GET", resource: "/", protocol: "HTTP/1.1" },
  statusCode: 200,
  responseSize: 100,
  referer: "referer",
  userAgent: "userAgent",
  extraFields: [],
};

export const dummyLogWithIpAddress = (ipAddress: string) => ({
  ...dummyLog,
  ipAddress,
});

export const dummyLogWithResource = (resource: string, statusCode = 200) => ({
  ...dummyLog,
  request: {
    ...dummyLog.request,
    resource,
  },
  statusCode,
});

export function* dummyLogTextLineGenerator() {
  let octet = 0;
  while (true) {
    yield `192.168.0.${octet++} remoteLogName userName [dateTime] "GET / HTTP/1.1" 200 100 "referer" "userAgent"`;
  }
}
