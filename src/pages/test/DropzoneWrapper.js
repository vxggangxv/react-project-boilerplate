import React, { useEffect, useState } from 'react';
import { Dropzone } from 'components/common/dropzone';
import styled from 'styled-components';

function DropzoneChildren() {
  return <Styled.DropzoneChildren className="content__container">content</Styled.DropzoneChildren>;
}

function DropzoneWrapper({ className, children, width, height }) {
  const [visible, setVisible] = useState(false);

  const handleSetVisible = toggle => {
    setVisible(toggle);
  };

  useEffect(() => {
    console.log(children, 'children');
  }, []);
  // useEffect(() => {
  //   console.log(visible, 'visible');
  // }, [visible]);

  return (
    <Styled.DropzoneWrapper
      data-component-name="DropzoneWrapper"
      onDragEnter={() => handleSetVisible(true)}
      width={!className && width}
      height={!className && height}
      className={className}
    >
      {children}
      {visible && <Dropzone onSetVisible={handleSetVisible} />}
      {/* {true && <Dropzone onSetVisible={handleSetVisible} />} */}
    </Styled.DropzoneWrapper>
  );
}

function DropzoneContainer() {
  return (
    <DropzoneWrapper width={800} height={300}>
      <DropzoneChildren />
    </DropzoneWrapper>
  );
}

const Styled = {
  DropzoneWrapper: styled.div`
    position: relative;
    width: ${({ width }) => (width ? `${width}px` : `100%`)};
    height: ${({ height }) => (height ? `${height}px` : `100%`)};
  `,
  DropzoneChildren: styled.div`
    width: 100%;
    height: 100%;
    background-color: #bbb;
  `,
};

export default DropzoneContainer;
