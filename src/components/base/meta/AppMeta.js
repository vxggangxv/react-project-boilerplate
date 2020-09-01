import React from 'react';
import Helmet from 'react-helmet';

const locales = {
  en: 'en_US',
  ko: 'ko_KR',
};

function AppMeta(props) {
  // NOTE: 차후 설정된 값으로 변경
  const siteName = 'WebSite';
  const lang = locales[props.locale] || locales['ko'];
  const title = props.title || 'Website';
  const description = props.description || 'Description';
  const image = props.image !== undefined && `${props.image}`;
  const favicon = props.favicon !== undefined && `${props.favicon}`;
  const canonical = `https://www.your-homepage.com/${props.canonical}`;
  const type = props.type === undefined ? 'website' : props.type;

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{title}</title>
        <meta name="description" content={description} />
        {canonical && <link rel="canonical" href={canonical} />}
        {image && <link rel="image_src" href={image} />}
        {image && <meta itemprop="image" content={image} />}
        {favicon && <link rel="shortcut icon" href={favicon} type="image/x-icon"></link>}

        {/* facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={description} />}
        {image && <meta property="og:image" content={image} />}
        {canonical && <meta property="og:url" content={canonical} />}
        {/* 
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content={locales[lang]} />
        <meta property="fb:pages" content={siteName} />
         */}

        {/* twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        {description && <meta name="twitter:description" content={description} />}
        {image && <meta name="twitter:image" content={image} />}
        {canonical && <meta property="twitter:url" content={canonical} />}
        {/* 
        <meta name="twitter:site" content="@트위터아이디" />
        <meta name="twitter:creator" content="@트위터아이디" />
         */}
      </Helmet>
    </>
  );
}

export default AppMeta;
