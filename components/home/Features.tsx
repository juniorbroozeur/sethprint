import { useTranslations } from 'next-intl';

type Feature = { ico: string; name: string; desc: string };

export default function Features() {
  const t = useTranslations('features');
  const feats = t.raw('items') as Feature[];

  return (
    <section style={{background:'var(--bg)',padding:0}}>
      <div id="features">
        <div style={{textAlign:'center',marginBottom:0}} className="reveal">
          <div className="s-badge lg">{t('badge')}</div>
          <h2 className="s-title">{t('title_1')} <span className="wy">{t('title_diff')}</span> {t('title_2')} <span className="wm">{t('title_all')}</span></h2>
        </div>
        <div className="feat-grid reveal">
          {feats.map((f) => (
            <div key={f.name} className="feat-card">
              <div className="feat-ico">{f.ico}</div>
              <div className="feat-name">{f.name}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
