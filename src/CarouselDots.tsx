import { useEffect, useRef, useState } from 'react';

// Pallini sotto un carosello orizzontale (solo mobile).
// Va messo subito dopo il contenitore che scorre: lo trova come elemento precedente.
export default function CarouselDots({ count, label }: { count: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scroller = () => ref.current?.previousElementSibling as HTMLElement | null;

  useEffect(() => {
    const el = scroller();
    if (!el) return;
    const onScroll = () => {
      const kids = Array.from(el.children) as HTMLElement[];
      if (!kids.length) return;
      const left = el.scrollLeft + el.clientWidth * 0.3;
      let idx = 0;
      kids.forEach((k, i) => { if (k.offsetLeft - el.offsetLeft <= left) idx = i; });
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) idx = kids.length - 1;
      setActive(idx);
    };
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [count]);

  useEffect(() => { setActive(0); }, [count]);

  const go = (i: number) => {
    const el = scroller();
    const kid = el?.children[i] as HTMLElement | undefined;
    if (el && kid) el.scrollTo({ left: kid.offsetLeft - el.offsetLeft - 20, behavior: 'smooth' });
  };

  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 16 }}>
      <div role="tablist" aria-label={label} style={{ display: 'flex', gap: 2 }}>
        {Array.from({ length: count }).map((_, i) => (
          <button key={i} type="button" aria-label={`${i + 1} / ${count}`} aria-selected={i === active} onClick={() => go(i)}
            style={{ width: 28, height: 28, padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ display: 'block', width: i === active ? 22 : 8, height: 8, borderRadius: 4, background: i === active ? '#EA580C' : '#525252', transition: 'width 0.25s, background 0.25s' }} />
          </button>
        ))}
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', color: '#A3A3A3', textTransform: 'uppercase' }}>{active + 1} / {count}</span>
    </div>
  );
}
