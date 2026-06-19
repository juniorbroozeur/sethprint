import { useTranslations } from 'next-intl';

type ServiceItem = {
  num: string;
  color: string;
  name: string;
  tags: string[];
};

export default function Services() {
  const t = useTranslations('services');
  const services = t.raw('items') as ServiceItem[];

  return (
    <section id="services">
      <div className="srv-head reveal">
        <div>
          <div className="s-badge">{t('badge')}</div>
          <h2 className="s-title">{t('title_pre')} <span className="wm">{t('title_highlight')}</span></h2>
        </div>
        <p className="s-sub" style={{maxWidth:'360px',marginBottom:0}}>
          {t('subtitle_line1')}<br/>{t('subtitle_line2')}
        </p>
      </div>
      {services.map((s) => (
        <div key={s.num} className={`srv-row ${s.color} reveal`}>
          <div className="srv-num">{s.num}</div>
          <div className="srv-name">{s.name}</div>
          <div className="srv-tags">
            {s.tags.map((tag) => (
              <span key={tag} className="srv-tag">{tag}</span>
            ))}
          </div>
          <div className="srv-arr">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </div>
        </div>
      ))}
    </section>
  );
}