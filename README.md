# Mantel Log File Parser Test

Test to parse a log file and answer specific questions about the logs.\
Format of the log file is specified under Assumptions.

# Assumptions

As TypeScript transpiles to JavaScript, I believe it meets the requirement of
using JavaScript for this assessment.

Valid log entries consist of the following fields:

- ipAddress
- remoteLogName
- userName
- dateTime
- request
  - method
  - resource
  - protocol
- statusCode
- responseSize
- referer
- userAgent
- extraFields

IP Addresses octets with preceding 0's e.g. 50.112.00.11 are treated as
50.112.0.11

## Queries

Visited URLs should only include successful visits

# Instructions

Instal dependencies

```bash
pnpm i
```

To start with the default `programming-task-example-data.log` file

```bash
pnpm start
```

You can pass the name of the file to parse by providing it to FILE before the
`start` script e.g.:

```bash
FILE=path/use-this-file.log pnpm start
```
