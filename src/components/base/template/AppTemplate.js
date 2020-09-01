import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { AppMeta } from 'components/base/meta';
import { AppHeader } from 'components/base/header';
import { AppFooter } from 'components/base/footer';

function AppTemplate(props) {
  const {
    title,
    nav,
    children,
    childrenTitle,
    leftSide,
    rightSide,
    templateStyleConf,
    childStyleConf,
  } = props;
  // NOTE: 기본 값이 잆을 경우
  const header = props.header || <AppHeader />;
  const footer = props.footer || <AppFooter />;

  return (
    <>
      <AppMeta title={title} />
      <Styled.AppTemplate className="wrapper" templateStyleConf={templateStyleConf}>
        {header && <div className={cx('AppTemplate__header')} children={header} />}

        {nav && <div className={cx('AppTemplate__nav')} children={nav} />}

        {children && (
          <main className={cx('AppTemplate__main', { main_title: childrenTitle })}>
            {childrenTitle && <h1 className="AppTemplate__main_title">{childrenTitle}</h1>}

            {children && (
              <div childStyleConf={childStyleConf} className={cx('AppTemplate__main_children')}>
                {children}
              </div>
            )}
          </main>
        )}

        {footer && <div className={cx('AppTemplate__footer')} children={footer} />}

        {leftSide && <div className={cx('AppTemplate__leftSide')} children={leftSide} />}

        {rightSide && <div className={cx('AppTemplate__rightSide')} children={rightSide} />}
      </Styled.AppTemplate>
    </>
  );
}

const Styled = {
  AppTemplate: styled.main`
    width: 1200px;
    margin: auto;

    @media screen and (max-width: 1200px) {
      width: 100%;
      padding: 15px;
    }
  `,
};
// sreen

export default AppTemplate;
