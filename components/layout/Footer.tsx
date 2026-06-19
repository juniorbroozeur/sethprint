import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <div style={{background:'var(--bg)',borderTop:'1px solid rgba(255,255,255,.04)'}}>
      <div className="cmyk-bar"><span className="cc"/><span className="mm"/><span className="yy"/><span className="kk" style={{background:'rgba(255,255,255,.15)'}}/></div>
      <footer>
        <div className="ft-top">
          <div>
            <div className="ft-logo-name"><span className="fc">S</span><span className="fm">e</span><span className="fy">t</span><span style={{color:'#fff'}}>h Print Design</span></div>
            <div className="ft-logo-tag">Work Perfection</div>
            <p className="ft-desc">{t('desc')}</p>
          </div>
          <div>
            <div className="ft-ct">{t('col_services')}</div>
            <ul className="ft-links"><li><a href="#">{t('s_print')}</a></li><li><a href="#">{t('s_design')}</a></li><li><a href="#">{t('s_web')}</a></li><li><a href="#">{t('s_branding')}</a></li></ul>
          </div>
          <div>
            <div className="ft-ct">{t('col_products')}</div>
            <ul className="ft-links"><li><a href="#">{t('p_textile')}</a></li><li><a href="#">{t('p_mugs')}</a></li><li><a href="#">{t('p_cards')}</a></li><li><a href="#">{t('p_banners')}</a></li></ul>
          </div>
          <div>
            <div className="ft-ct">{t('col_delivery')}</div>
            <ul className="ft-links"><li><a href="#">Lubumbashi</a></li><li><a href="#">Kinshasa</a></li><li><a href="#">Kolwezi</a></li><li><a href="#">Likasi</a></li></ul>
          </div>
        </div>
        <div className="ft-bottom">
          <div>© 2025 <span className="fc">Seth</span><span className="fm"> Print</span><span className="fy"> Design</span>. {t('rights')}</div>
          <div>{t('based_pre')} <span className="fc">Lubumbashi</span>, RDC</div>
        </div>
      </footer>
    </div>
  );
}
