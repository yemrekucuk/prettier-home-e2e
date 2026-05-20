import { APIRequestContext } from "@playwright/test";

/**
 * Belirtilen endpointe GET request gönderir ve API'nin response time'ini ms cinsinden döner.
 */
export async function measureGetResponseTime(
  request: APIRequestContext,
  endpoint: string,
): Promise<number> {
  const startTime = Date.now();
  await request.get(endpoint);
  const endTime = Date.now();
  const responseTime = endTime - startTime;
  return responseTime;
}
