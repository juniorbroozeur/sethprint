import { useTranslations } from 'next-intl';

type Testimonial = { q: string; name: string; role: string };

export default function Testimonials() {
  const tr = useTranslations('testimonials');
  const testis = tr.raw('items') as Testimonial[];

  return (
    <section id="testi" style={{background:'var(--bg)'}}>
      <div style={{textAlign:'center'}} className="reveal">
        <div className="s-badge lg">{tr('badge')}</div>
        <h2 className="s-title">{tr('title_pre')} <span className="wy">{tr('title_highlight')}</span></h2>
      </div>
      <div className="testi-grid">
        {testis.map((t,i) => (
          <div key={i} className={`testi-card reveal d${i+1}`}>
            <div className="testi-accent" />
            <p className="testi-q">{t.q}</p>
            <div className="testi-name">{t.name}</div>
            <div className="testi-role">{t.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
