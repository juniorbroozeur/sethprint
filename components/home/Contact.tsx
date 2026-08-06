'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Contact() {
  const t = useTranslations('contact');
  const [sent, setSent] = useState(false);
  return (
    <div id="contact-wrap">
      <div id="contact">
        <div className="reveal">
          <div className="s-badge lg">{t('badge')}</div>
          <h2 className="s-title">{t('title_pre')}<br/>{t('title_mid')} <span className="wc">{t('title_highlight')}</span></h2>
          <p className="s-sub">{t('subtitle')}</p>
          <div className="ct-channels">
            <a href="https://wa.me/66660246322" className="ct-ch" target="_blank" rel="noopener noreferrer">
              <div className="ct-ico">
                <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.999 0C5.373 0 0 5.373 0 12c0 2.117.554 4.102 1.523 5.83L.05 23.948l6.273-1.444A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.626 0 12 0z"/></svg>
              </div>
              <div><div className="ct-lbl">WhatsApp</div><div className="ct-val">+66 6-6024-6322 · +255 766 892 369</div></div>
            </a>
            <a href="tel:+243993411135" className="ct-ch">
              <div className="ct-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12 19.79 19.79 0 0 1 1.65 3.42 2 2 0 0 1 3.62 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6.06 6.06l1.15-1.15a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div><div className="ct-lbl">{t('ch_call')}</div><div className="ct-val">+243 993 411 135</div></div>
            </a>
            <a href="https://vm.tiktok.com/ZS9YfhNju2sYU-uP9c7/" className="ct-ch" target="_blank" rel="noopener noreferrer">
              <div className="ct-ico">
                <svg viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.86a8.27 8.27 0 0 0 4.84 1.56V7.01a4.85 4.85 0 0 1-1.08-.32z"/></svg>
              </div>
              <div><div className="ct-lbl">TikTok</div><div className="ct-val">{t('ch_tiktok')}</div></div>
            </a>
            <a href="https://www.instagram.com/sethprintdesign" className="ct-ch" target="_blank" rel="noopener noreferrer">
              <div className="ct-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div><div className="ct-lbl">Instagram</div><div className="ct-val">{t('ch_instagram')}</div></div>
            </a>
          </div>
        </div>
        <div className="ct-form reveal d2">
          <div><label className="cf-lbl">{t('form_name')}</label><input type="text" className="cf-inp" placeholder={t('form_name_ph')}/></div>
          <div><label className="cf-lbl">{t('form_contact')}</label><input type="text" className="cf-inp" placeholder={t('form_contact_ph')}/></div>
          <div>
            <label className="cf-lbl">{t('form_service')}</label>
            <select className="cf-inp">
              <option value="">{t('form_service_default')}</option>
              <option>{t('opt_print')}</option>
              <option>{t('opt_design')}</option>
              <option>{t('opt_web')}</option>
              <option>{t('opt_branding')}</option>
              <option>{t('opt_cards')}</option>
              <option>{t('opt_other')}</option>
            </select>
          </div>
          <div><label className="cf-lbl">{t('form_message')}</label><textarea className="cf-inp" placeholder={t('form_message_ph')}/></div>
          <button className="cf-sub" onClick={() => setSent(true)}>
            {sent ? t('btn_sent') : t('btn_send')}
          </button>
        </div>
      </div>
    </div>
  );
}