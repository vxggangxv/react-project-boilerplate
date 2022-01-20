import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import moment from 'moment';
import cx from 'classnames';
//ant react module
import { DatePicker } from 'antd';
import 'styles/lib/antPicker.css';
// import 'antd/dist/antd.css';
import PropTypes from 'prop-types';

CustomDatePicker.propsTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
};

/**
 * @param {*} props
 * defaultValue : Date, // moment 객체
 * placeholder : string //
 * showToday : boolean // 하단에 today 버튼 여부
 * onChange : function(date, dateString) // 날짜 변경 데이터를 컨트롤할 함수
 * disabledDate : boolean, // 지난 날짜 선택 여부
 * 
 *  <CustomDatePicker
    value={moment.unix(dueDate)}
    className="CreateCase_input date"
    onChange={handleChange('date')}
    style={{ width: '100%', height: '40px' }}
  />
 */
function CustomDatePicker(props) {
  const [date, setDate] = useState(null);
  const {
    className,
    style,
    value,
    defaultVisibleValue = null,
    defaultValue = null,
    placeholder = 'Pick a day',
    showToday = false,
    onChange,
    disabledDate = false,
  } = props;

  // value가 안 올경우 보여주기식 함수, value가 필수이기때문에 사용이 안됨.
  const handleChangeDate = value => {
    console.log('default date pick');
    const dateValue = value ? moment(value) : null;
    setDate(dateValue);
  };

  const setDisabledDate = current => {
    // 이전 날짜 선택 안됨(당일 선택 불가능)
    // return current && current < moment().endOf('day');
    // 이전 날짜 계산하는 함수(당일 선택 가능)
    return current < moment().startOf('day');
  };

  const handleChange = config => {};

  // console.log(value, 'value');
  // console.log(defaultValue, 'defaultValue');
  // console.log(moment.unix(moment().unix()), 'moment');
  // console.log(moment(), 'moment');

  return (
    <Styled.DatePicker className={cx('datePicker__box', className)}>
      <DatePicker
        style={style}
        value={value || defaultVisibleValue}
        className="datePicker__content"
        defaultValue={defaultValue ? defaultValue : moment()}
        placeholder={placeholder}
        showToday={showToday}
        onChange={onChange || handleChangeDate}
        disabledDate={disabledDate && setDisabledDate}
      />
      {/* {antd} */}
      <Styled.GlobalStyles />
    </Styled.DatePicker>
  );
}

const Styled = {
  DatePicker: styled.div`
    & {
      .MuiOutlinedInput-adornedEnd {
        width: 100%;
      }
    }
  `,
  GlobalStyles: createGlobalStyle`
    .ant-picker {
      border-radius: 4px;
      &.ant-picker-focused {
        box-shadow: none;
      }
    }
    .ant-picker-content {
      .ant-picker-cell-today,
      .ant-picker-cell-selected
       {
         .ant-picker-cell-inner{
          border-radius: 50%;
          &:before{
            border-radius: 50% !important;
          }
         }
      }
    }
  `,
};

export default CustomDatePicker;
