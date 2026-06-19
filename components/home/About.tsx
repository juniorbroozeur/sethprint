import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');
  return (
    <section id="brt">
      <p className="brt-desktop">{t('phrase_long')}</p>
      <p className="brt-mobile">{t('phrase_short')}</p>
    </section>
  );
}
