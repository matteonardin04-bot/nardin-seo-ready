import { Link, useLocation } from 'react-router-dom';

// Coppie di pagine IT <-> DE. Usate dal selettore lingua e dai tag hreflang.
export const LANG_PAIRS: [string, string][] = [
  ['/', '/de'],
  ['/noleggio-autogru-trento', '/de/autokranvermietung-trient'],
  ['/trasporti-eccezionali-trentino', '/de/schwertransporte-trentino'],
  ['/trasporto-gru-edili', '/de/baukran-transport-montage'],
  ['/logistica-industriale', '/de/industrielogistik'],
];

export function altPaths(path: string): { it: string; de: string } | null {
  const p = LANG_PAIRS.find(([it, de]) => it === path || de === path);
  return p ? { it: p[0], de: p[1] } : null;
}

export default function LangSwitch({ big = false }: { big?: boolean }) {
  const { pathname } = useLocation();
  const isDe = pathname === '/de' || pathname.startsWith('/de/');
  const alt = altPaths(pathname) || { it: '/', de: '/de' };
  const base = { textDecoration: 'none', fontWeight: 700, letterSpacing: '0.15em', fontSize: big ? 22 : 14, padding: big ? 0 : '8px 4px' } as const;
  return (
    <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }} aria-label="Lingua / Sprache">
      <Link to={alt.it} hrefLang="it" style={{ ...base, color: isDe ? '#A3A3A3' : '#EA580C' }}>IT</Link>
      <span style={{ color: '#525252', fontSize: big ? 22 : 14 }}>|</span>
      <Link to={alt.de} hrefLang="de" style={{ ...base, color: isDe ? '#EA580C' : '#A3A3A3' }}>DE</Link>
    </span>
  );
}
