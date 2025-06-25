import { fields } from "./schemas/fields";

const HTTP_VERBS = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "HEAD",
  "OPTIONS",
  "CONNECT",
  "TRACE",
];

const logRegex = new RegExp(
  `^(?<ipAddress>\\S+) (?<remoteLogName>\\S+) (?<userName>\\S+) \\[(?<dateTime>[^\\]]+)\\] "(?<requestMethod>${HTTP_VERBS.join(
    "|"
  )}) (?<requestResource>\\S+) (?<requestProtocol>\\S+)" (?<statusCode>\\S+) (?<responseSize>\\S+) "(?<referer>[^"]*)" "(?<userAgent>[^"]*)" ?(?<extraFields>.*)$`
);

export const parseFields = (line: string) => {
  const match = line.match(logRegex);

  const {
    requestMethod,
    requestResource,
    requestProtocol,
    extraFields,
    ...rest
  } = match?.groups || {};

  return fields.safeParse({
    ...rest,
    request: {
      method: requestMethod,
      resource: requestResource,
      protocol: requestProtocol,
    },
    extraFields: extraFields?.split(" ").filter(Boolean),
  });
};
