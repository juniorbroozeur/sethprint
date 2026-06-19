import { useTranslations } from 'next-intl';

type City = { name: string; flag: string };

export default function Delivery() {
  const t = useTranslations('delivery');
  const cities = t.raw('cities') as City[];

  return (
    <section id="delivery" style={{background:'var(--bg)'}}>
      <div className="reveal">
        <div className="s-badge lg">{t('badge')}</div>
        <h2 className="s-title">{t('title_pre')} <span className="wy">{t('title_highlight')}</span></h2>
        <p className="s-sub" style={{textAlign:'center',maxWidth:'400px',margin:'0 auto'}}>
          {t('subtitle')}
        </p>
      </div>
      <div className="cities reveal">
        {cities.map((c) => (
          <div key={c.name} className="city">
            <div className="city-icon">📍</div>
            <div className="city-name">{c.name}</div>
            <div className="city-flag">{c.flag}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
