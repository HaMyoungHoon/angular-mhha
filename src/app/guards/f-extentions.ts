export function awaitDelay(ms: number): Promise<void> {
  return new Promise(x => setTimeout(x, ms));
}
export let defLat = 37.5020656;
export let defLng = 126.8880897;
export let defPosition = { lat: defLat, lng: defLng };
