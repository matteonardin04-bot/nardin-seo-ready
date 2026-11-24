// Decides the initial "mobile" layout flag.
// - In the browser: read the real viewport width on the very first render, so the
//   page doesn't render desktop first and then jump to mobile.
// - During build-time prerendering (no window): use the value the build script
//   sets in globalThis.__PRERENDER_MOBILE__ to produce the mobile or desktop snapshot.
export const MOBILE_BREAKPOINT = 900;

export function initialMobile(): boolean {
  if (typeof window !== 'undefined') return window.innerWidth < MOBILE_BREAKPOINT;
  return Boolean((globalThis as { __PRERENDER_MOBILE__?: boolean }).__PRERENDER_MOBILE__);
}
