import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { AppMeta } from 'components/base/meta';
import { AppHeader } from 'components/base/header';
import { AppFooter } from 'components/base/footer';
import PropTypes from 'prop-types';

function AppTemplate(props) {
  const {
    title = '',
    nav,
    children,
    childrenTitle,
    leftSide,
    rightSide,
    templateStyle,
    childrenStyle,
    headerHide = false,
    footerHide = false,
  } = props;

  // NOTE: 기본 값이 있을 경우
  const header = (props.header && !headerHide) || <AppHeader />;
  const footer = (props.footer && !footerHide) || <AppFooter />;

  return (
    <>
      <AppMeta title={title} />
      <Styled.AppTemplate data-component-name="AppTemplate" style={templateStyle}>
        {header && <div className={cx('template__header')} children={header} />}

        {/* NOTE: header와 nav가 분리되어있을 경우 */}
        {nav && <div className={cx('template__nav')} children={nav} />}

        {children && (
          <div className="template__main_container">
            {leftSide && <div className={cx('template__leftSide')} children={leftSide} />}
            <main className={cx('template__main', { main_title: childrenTitle })}>
              {childrenTitle && <h1 className="template__main_title">{childrenTitle}</h1>}

              {children && (
                <div style={childrenStyle} className={cx('template__main_children')}>
                  {children}
                </div>
              )}
            </main>
            {rightSide && <div className={cx('template__rightSide')} children={rightSide} />}
          </div>
        )}

        {footer && <div className={cx('template__footer')} children={footer} />}
      </Styled.AppTemplate>
    </>
  );
}

AppTemplate.propTypes = {
  title: PropTypes.string,
  headerHide: PropTypes.bool,
  footerHide: PropTypes.bool,
};

const Styled = {
  AppTemplate: styled.div`
    position: relative;
    .template__main_container {
      position: relative;
      width: 1200px;
      margin: auto;

      @media screen and (max-width: 1200px) {
        width: 100%;
        padding: 15px;
      }
    }
  `,
};

export default AppTemplate;
