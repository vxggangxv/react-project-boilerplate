import React from 'react';

/**
 * <EscapeConvert
 *  prev={'\n'}
 *  next={<br />}
 *  content={"야호 \n ㅋㅋㅋ"}
 * />
 * @param {*} param0
 */
const EscapeConvert = ({ prev, next, content }) =>
  content.split(prev).map((line, key) => {
    return (
      <div key={key}>
        {line}
        {next}
      </div>
    );
  });
export default EscapeConvert;
