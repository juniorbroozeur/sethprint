'use client';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

type ShowcaseItem = { num: string; img: string; name: string; tag: string };

export default function Showcase() {
  const locale = useLocale();
  const t = useTranslations('showcase');
  const items = t.raw('items') as ShowcaseItem[];

  return (
    <section id="showcase">
      <div className="sh-head reveal">
        <div>
          <div className="s-badge">{t('badge')}</div>
          <h2 className="s-title">{t('title_pre')} <span className="wc">{t('title_highlight')}</span></h2>
        </div>
        <Link href={`/${locale}/catalogue`} className="btn-c">{t('see_more')} →</Link>
      </div>
      <div className="sh-grid-real">
        {items.map((item, i) => (
          <div key={item.num} className={`sh-cell sh-cell-${['sw','ts','bg','ex'][i]} reveal d${i+1}`}>
            <img src={item.img} alt={item.name} loading="lazy" />
            <div className="sh-info">
              <div className="sh-num">{item.num}</div>
              <div className="sh-name">{item.name}</div>
              <div className="sh-tag">{item.tag}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
