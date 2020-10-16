import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * @param {string} prev
 * @param {node} next
 * @param {string} content
 */
function EscapeConvert({ prev = '\n', next = <br />, content }) {
  const splitContent = content.split(prev);
  const splitContentLastIdx = splitContent.length - 1;

  return (
    <>
      {splitContent.map((item, idx) => {
        // console.log(`${item} ${idx}`, 'item');
        return (
          <Fragment key={idx}>
            {item}
            {splitContentLastIdx !== idx && next}
          </Fragment>
        );
      })}
    </>
  );
}

EscapeConvert.propTypes = {
  content: PropTypes.any.isRequired,
};

export default EscapeConvert;
