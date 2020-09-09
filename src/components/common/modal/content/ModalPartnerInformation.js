import React from 'react';
import cx from 'classnames';
import styled from 'styled-components';
import moment from 'moment';
import { font, color } from 'styles/__utils';
import { icon_unlogged_person } from 'components/base/images';
import { mapper } from 'lib/mapper';
import { Actions } from 'store/actionCreators';

const { HANDLEEVENTTYPE } = mapper;

function ModalPartner(props) {
  const { modalInfo = {}, onClick = () => {}, modalType = '' } = props;
  const {
    profileData = {},
    profile = {},
    country_id,
    myCode,
    company,
    manager,
    email,
    phone,
    address,
    country,
    state,
    type,
    licenseData,
  } = modalInfo;

  const defaultProfilePath = icon_unlogged_person;
  const profileImgSrc = profile.imgSrc;
  const profileImage = profileImgSrc ? profileImgSrc : defaultProfilePath;

  const label = {
    email: '메일 주소',
    myCode: '고유번호',
    company: '업체명',
    manager: '대표자',
    type: '타입',
    local: '지역',
    licence: '기공소 라이센스',
    phone: '연락처',
    address: '주소',
  };

  //데이터 파싱
  const typeList = {
    clinic: '클리닉',
    lab: '기공소',
    milling: '밀링센터',
    none: '없음',
  };

  let koreaAuthState = '';
  if (country_id === 116 && licenseData) {
    if (licenseData.state === 0) {
      koreaAuthState = '(신청)';
    } else if (licenseData.state === 1) {
      koreaAuthState = '(인증완료)';
    } else {
      koreaAuthState = '(거부)';
    }
  }

  const data = {
    myCode: myCode,
    company: company,
    manager: manager,
    email: email,
    phone: phone,
    address: address,
    licence: licenseData
      ? `${licenseData.licenseCode} ${koreaAuthState} (${moment(licenseData.licenseDate).format(
          'YYYY-MM-DD',
        )})`
      : '',
    local: `${country} / ${state}`,
    type: type,
  };

  const tagCont = Object.keys(label).map((i, index) => {
    if (i === 'licence') {
      if (type.lab) {
        return (
          <div className="partnerInformation__rows" key={index}>
            <div className="row_label">{label[i]}</div>
            <div className="row_cont">{data[i]}</div>
          </div>
        );
      }
    } else {
      return (
        <div className="partnerInformation__rows" key={index}>
          <div className="row_label">{label[i]}</div>
          <div className="row_cont">{data[i]}</div>
        </div>
      );
    }
  });

  const handleClick = () => {
    Actions.base_popup({
      type: 'confirm',
      title: '삭제하시겠습니까?',
      content: '삭제 시 작업을 의뢰 받을 수 없습니다.',
      isOpen: true,
      dim: true,
      onClick: () => {
        onClick({
          type: 'partnerDelete',
          partnerCode: myCode,
          name: 'modalPartnerDelete',
        });
      },
    });
  };

  return (
    <Styled.ModalPartner>
      <div className="partner_info_wrap">
        <div className={cx('profile')}>
          <img src={profileImage} className={cx('profile__img', { view: profileImgSrc })} />
        </div>
        <div className="cont">{tagCont}</div>
      </div>
      {modalType === 'partnerList' ? (
        <div className="delete__btn">
          <button onClick={handleClick}>파트너 삭제하기</button>
        </div>
      ) : null}
    </Styled.ModalPartner>
  );
}

const Styled = {
  ModalPartner: styled.div`
    position: relative;
    padding: 40px 30px 20px;
    .partner_info_wrap {
      position: relative;
      border: 1px solid ${color.gray_border2};
      padding: 50px 20px 50px 40px;
      .profile {
        text-align: center;
        .profile__img {
          display: inline-block;
          width: 100px;
          height: 100px;
          border-radius: 10px;
          &.view {
            border: 1px solid #777;
            padding: 5px;
          }
        }
      }
      .cont {
        margin-top: 50px;
        min-height: 265px;
      }
    }
    .partnerInformation__rows {
      position: relative;
      margin-top: 10px;
      ${font(16, color.black_font)};
      .row_label {
        position: absolute;
        left: 0;
        top: 0;
        font-weight: 500;
        color: ${color.black_font};
      }
      .row_cont {
        display: inline-block;
        padding-left: 140px;
        color: ${color.gray_font};
      }
    }

    .delete__btn {
      margin-top: 10px;
      font-size: 0;

      button {
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
        color: #fff;
        background-color: #98b8cb;
        font-size: 16px;
        font-weight: 600;
        border: none;
        cursor: pointer;
      }
    }
  `,
};

export default ModalPartner;
