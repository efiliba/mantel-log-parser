# Mantel Log File Parser Test

Test to parse log a file and answer specific questions about the logs.\
Format of the log file specified under Assumptions.

# Assumptions

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
- resposeSize
- referer
- userAgent
- extraFields

# Instructions

To start with the default `programming-task-example-data.log` file

```bash
pnpm start
```

You can name of the file to parse by providing it to FILE before the start script

```bash
FILE=path/use-this-file.log pnpm start
```
