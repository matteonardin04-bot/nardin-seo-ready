// Initial value of the "mobile" layout flag, read on the very first render.
// Starting from `false` and correcting it in an effect made phones paint the
// desktop layout first and then jump to the mobile one (layout shift / CLS).
export const MOBILE_BREAKPOINT = 900;

export function initialMobile(): boolean {
  return typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT;
}
