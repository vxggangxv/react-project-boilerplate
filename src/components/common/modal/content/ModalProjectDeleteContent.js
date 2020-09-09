import React from 'react';
import { useImmer } from 'use-immer';
import styled from 'styled-components';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import cx from 'classnames';
import { useDidUpdateEffect } from 'lib/utils';
import { parseValue } from 'lib/library';

import { color, font, _media, floatClear, disableDrag } from 'styles/__utils';
const ModalProjectDeleteContentState = {
  checked: null,
};
function ModalProjectDeleteContent(props) {
  const { onChange = () => {}, defaultValue = 1, value = 1 } = props;
  const [values, setValues] = useImmer(ModalProjectDeleteContentState);
  const deleteCompleteIndex = 0;
  const onlyCoundIndex = 1;

  const handleChange = e => {
    const targetValue = e.target.value;
    setValues(draft => {
      draft.checked = Number(targetValue);
    });
  };

  const checkVal = values.checked === null ? parseValue(defaultValue, 1) : values.checked;

  useDidUpdateEffect(() => {
    onChange({ value: values.checked });
  }, [values.checked]);

  return (
    <Styled.ModalProjectDeleteContent>
      <p className="ProjectDeleteModal__info tx">
        You can delete only cloud data or both project information and data. When a project is
        deleted, it cannot be recovered.
      </p>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={checkVal}
        onChange={handleChange}
        className="ProjectDeleteModal__radioGroup"
      >
        <FormControlLabel
          value={onlyCoundIndex}
          control={<Radio className="hiddenRadio " />}
          className="ProjectDeleteModal__labelContol"
          label={
            <span className={cx('ProjectDeleteModal__label', { on: checkVal === onlyCoundIndex })}>
              Delete Cloud Data Only
            </span>
          }
        />
        <FormControlLabel
          value={deleteCompleteIndex}
          control={<Radio className="hiddenRadio " />}
          className="ProjectDeleteModal__labelContol"
          label={
            <span
              className={cx('ProjectDeleteModal__label ', {
                on: checkVal === deleteCompleteIndex,
              })}
            >
              Delete Both
            </span>
          }
        />
      </RadioGroup>
    </Styled.ModalProjectDeleteContent>
  );
}

const Styled = {
  ModalProjectDeleteContent: styled.div`
    & {
      ${disableDrag};
      .ProjectDeleteModal__info {
        ${font(15, '#666666')};
        margin-bottom: 20px;
        padding: 10px 27px;
      }
      .ProjectDeleteModal__radioGroup {
        ${floatClear};
        display: block;
        margin-bottom: 30px;
        text-align: center;
      }
      .ProjectDeleteModal__labelContol {
        float: left;
        margin: 0;
        width: calc(100% / 2);
        text-align: center;
        position: relative;
      }
      .ProjectDeleteModal__label {
        display: inline-block;
        border-radius: 5px;
        border: 1px solid ${color.gray_border};
        ${font(15, color.black_font)};
        font-weight: bold;
        cursor: pointer;
        padding: 10px;
        text-align: center;
        width: 100%;
        &:hover {
          background: ${color.gray_week};
        }
        &.on {
          border: 1px solid ${color.blue};
        }
      }
      .MuiTypography-root {
        margin: auto;
        width: 95%;
      }

      .hiddenRadio {
        display: none;
      }
    }
  `,
};

export default ModalProjectDeleteContent;
