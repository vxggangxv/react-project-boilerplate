import React, { useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import cx from 'classnames';
import { color, font, device } from 'styles/__utils';
import { getElementSize } from 'lib/library';

function MainTemplate({ nav, header, children, title, rightSpace, styleConf }) {
  const navRef = useRef(null);
  const headerRef = useRef(null);
  const childrenRef = useRef(null);
  const rightSpaceRef = useRef(null);
  const [cSize, setCSize] = useImmer({
    header: { x: null, y: null },
    nav: { x: null, y: null },
    children: { x: null, y: null },
    rightSpace: { x: null, y: null },
  });

  useLayoutEffect(() => {
    if (navRef.current) {
      setCSize(draft => {
        draft.header = getElementSize(headerRef.current);
        draft.nav = getElementSize(navRef.current);
        draft.children = getElementSize(childrenRef.current);
        draft.rightSpace = getElementSize(rightSpaceRef.current);
      });
    }
  }, [setCSize]);

  return (
    <Styled.MainTemplate {...cSize} bg={color.gray_dashboard} styleConf={styleConf}>
      {header && (
        <div className={cx('MainTemplate__header')} children={header} ref={headerRef} />
      )}
      {nav && <div className={cx('MainTemplate__nav')} children={nav} ref={navRef} />}

      {children && (
        <div
          className={cx('MainTemplate__main', { MainTemplate__align_start: title })}
          ref={childrenRef}
        >
          {title && <div className="MainTemplate__title">{title}</div>}

          {children && (
            <div bg={'white'} className={cx('MainTemplate__children')}>
              {children}
            </div>
          )}
        </div>
      )}
      {rightSpace && (
        <div
          className={cx('MainTemplate__rightSpace')}
          children={rightSpace}
          ref={rightSpaceRef}
        />
      )}
    </Styled.MainTemplate>
  );
}

const Styled = {
  MainTemplate: styled.div`
  ${({ bg }) => bg && `background:${bg}`};
  min-height:100vh;
  &:after{
    display:block;
    content:'';
    clear: both;
  }

  .MainTemplate__header{
      position:fixed;
      left:0;
      top:0;
      width:100%;
      z-index:500
    }
    .MainTemplate__nav{
      z-index: 1101;
      position:fixed;
      left:0;
      top:${({ header }) => (header.y ? header.y : 0)}px;
      min-height:${({ header }) => (header.y ? `calc(100% - ${header.y}px)` : '100%')};
    }
    .MainTemplate__main{
      ${({ header }) => header.y && `margin-top:${header.y}px; height:calc(100% - ${header.y}px)`}
      ${({ nav, rightSpace }) =>
      nav.x &&
      `
        margin-left:${nav.x}px; 
        width:calc(100% - ${(rightSpace.x ? rightSpace.x : 0) + nav.x + 2 - 30}px)`};
      ${({ rightSpace }) => `padding:${rightSpace.x ? '0' : '30px'}`}
      &:after{
        display:block;
        content:"";
        clear: both;
      }
      padding: 20px;
      min-height:100vh;
      max-width:${device.pc};
      /* float:left; */
      display:flex;
      flex-wrap: wrap;
      &.MainTemplate__align_start {
        /* align-content: flex-start; */
        flex-direction: column;
      }
    }
    .MainTemplate__title{
      position:relative;
      background:white;
      margin-bottom:20px;
      padding:10px 20px;
      width:100%;
      font-weight:600;
      ${font(18, color.black_font)};
      &:after{
        position:absolute;
        display:block;
        content:"";
        left:0;
        top:0;
        width:5px;
        min-height:100%;
        background:${color.blue_week};
      }
    }
    .MainTemplate__rightSpace{
      /* display:inline-block; */
      /* float:left; */
      z-index: 100;
      position: absolute;
      top: 0;
      right: 0;
    }
    .MainTemplate__children{
      ${font(16, color.black_font)};
      position: relative;
      /* height:85vh; */
      /* overflow:auto; */
      box-shadow: 2px 2px 5px rgba(36, 53, 51, 0.2);
      width:100%;
      background:white;
      ${props => props.styleConf && props.styleConf};
      
    }
    /* .MuiTab-wrapper{
      ${font(15)};
    } */
    .MainTemplate__move_btn{
      float: right;
      ${font(16, color.black_font)};
      cursor: pointer;
      
    }
  `,
};

export default MainTemplate;
