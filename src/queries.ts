import type { LogFields } from "./schemas/fields";

export const totalUniqueIPAddresses = (logs: LogFields[]) => {
  const uniqueIPAddresses = new Set(logs.map(({ ipAddress }) => ipAddress));
  return uniqueIPAddresses.size;
};

const topN = (items: Map<string, number>, top: number) =>
  Array.from(items.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, top)
    .map(([item, count]) => `${item} (${count})`);

export const topVisitedURLs = (logs: LogFields[], top: number) => {
  const successfulLogs = logs.filter(({ statusCode }) => statusCode === 200);
  const resourceCounts = successfulLogs.reduce(
    (resources, { request }) =>
      resources.set(
        request.resource,
        (resources.get(request.resource) || 0) + 1
      ),
    new Map<string, number>()
  );

  return topN(resourceCounts, top);
};

export const topActiveIPAddress = (logs: LogFields[], top: number) => {
  const ipAddressCounts = logs.reduce(
    (ipAddresses, { ipAddress }) =>
      ipAddresses.set(ipAddress, (ipAddresses.get(ipAddress) || 0) + 1),
    new Map<string, number>()
  );

  return topN(ipAddressCounts, top);
};
