/**
 * IndexNow helper para Toolram.
 *
 * IndexNow notifica a Bing, Yandex y IndexNow.org partners cuando una URL
 * cambia. Acelera re-crawl en ~minutos vs días del crawl natural.
 *
 * La key debe coincidir con el archivo en /public/{key}.txt.
 */

export const INDEXNOW_KEY = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6";
export const INDEXNOW_HOST = "toolram.com";
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;

/**
 * Submit batch of URLs to IndexNow (max 10.000 per request).
 * Returns true if submission accepted (200/202).
 */
export async function submitToIndexNow(urls: string[]): Promise<boolean> {
  if (urls.length === 0) return true;
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: INDEXNOW_HOST,
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_LOCATION,
        urlList: urls
      })
    });
    return res.ok;
  } catch {
    return false;
  }
}
