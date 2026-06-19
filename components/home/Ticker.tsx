import { useTranslations } from 'next-intl';

export default function Ticker() {
  const t = useTranslations('ticker');
  const items = t.raw('items') as string[];
  const repeated = [...items, ...items];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {repeated.map((item, i) => (
          <span key={i} className="ticker-item">
            {item} <span className="ticker-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
