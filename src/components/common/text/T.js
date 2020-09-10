import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import { useShallowSelector } from 'lib/utils';

/**
 * <T
 *  lang={''}
 *  text={''}
 * >message.hello</T>
 * <T>{t('n.selected', { n: 5 })}</T>
 * lang을 주면 강제로 변환할수도 있음.reducer에 영향 받지 않음.
 * @param {*} props
 */
function T(props) {
  const { children, i18n, t, lang = '', text = '', convert = true } = props;
  const { language } = useShallowSelector(state => ({
    language: state.base.language,
  }));

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  let content = text || children;

  if (lang) {
    content = i18next.getFixedT(lang)(content);
  }
  return convert === false ? content : t(content);
}

export default withTranslation()(T);
