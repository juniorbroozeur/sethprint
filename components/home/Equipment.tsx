import { useTranslations } from 'next-intl';

type Machine = { name: string; tags: string };
type Avantage = { ico: string; title: string; desc: string; color: string };
type Livraison = { pays: string; villes: string; color: string; flag: string };

export default function Equipment() {
  const t = useTranslations('equipment');
  const machines = t.raw('machines') as Machine[];
  const consommables = t.raw('consommables') as string[];
  const avantages = t.raw('avantages') as Avantage[];
  const livraison = t.raw('livraison') as Livraison[];

  return (
    <section id="equipment">
      <div className="eq-inner">
        <div className="eq-head reveal">
          <div>
            <div className="s-badge">{t('badge')}</div>
            <h2 className="s-title">{t('title_pre')} &amp; <span className="wc">{t('title_highlight')}</span></h2>
          </div>
          <p className="s-sub" style={{maxWidth:"360px",marginBottom:0}}>
            {t('subtitle_pre')} <span className="wy">{t('subtitle_china')}</span> {t('subtitle_post')}
          </p>
        </div>

        <div className="eq-avantages reveal">
          {avantages.map((a, i) => (
            <div key={i} className="eq-av" style={{borderLeft:`2px solid ${a.color}`}}>
              <div className="eq-av-ico">{a.ico}</div>
              <h4 className="eq-av-title">{a.title}</h4>
              <p className="eq-av-desc">{a.desc}</p>
            </div>
          ))}
        </div>

        <div className="eq-lists reveal">
          <div className="eq-col">
            <div className="eq-col-title">
              <span className="eq-dot" style={{background:"var(--c)"}} />
              {t('machines_title')}
            </div>
            <div className="eq-items">
              {machines.map((m, i) => (
                <div key={i} className="eq-item">
                  <span className="eq-arrow">→</span>
                  <span className="eq-item-name">{m.name}</span>
                  {m.tags && <span className="eq-item-tag">{m.tags}</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="eq-col">
            <div className="eq-col-title">
              <span className="eq-dot" style={{background:"var(--m)"}} />
              {t('consommables_title')}
            </div>
            <div className="eq-items">
              {consommables.map((c, i) => (
                <div key={i} className="eq-item">
                  <span className="eq-arrow">→</span>
                  <span className="eq-item-name">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="eq-livraison reveal">
          <div className="eq-liv-title">
            <span className="eq-dot" style={{background:"var(--y)"}} />
            {t('livraison_title')}
          </div>
          <div className="eq-liv-grid">
            {livraison.map((l) => (
              <div key={l.pays} className="eq-liv-card" style={{borderTop:`2px solid ${l.color}`}}>
                <div className="eq-liv-flag">{l.flag}</div>
                <div className="eq-liv-pays" style={{color:l.color}}>{l.pays}</div>
                <div className="eq-liv-villes">{l.villes}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="eq-quote reveal">
          <p>
            {t('quote_pre')}{" "}
            <span className="wc">{t('quote_local')}</span> {t('quote_or')}{" "}
            <span className="wy">{t('quote_china')}</span> {t('quote_needs_pre')}{" "}
            <span className="wm">{t('quote_clients')}</span>{t('quote_end')}
          </p>
          <a href="#contact-wrap" className="btn-c" style={{marginTop:"28px",display:"inline-flex",borderRadius:"999px",padding:"13px 32px",fontSize:"13px"}}>
            {t('cta_quote')} →
          </a>
        </div>
      </div>
    </section>
  );
}
