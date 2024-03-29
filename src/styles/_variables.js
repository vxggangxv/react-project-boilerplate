import { css } from 'styled-components';

const purpleBgGradient = `linear-gradient(180deg, #EBEFFF 0%, #FFFFFF 48.96%, #EBEFFF 99.99%);`;
const scannerBgGradient = `linear-gradient(0deg, rgba(255, 255, 255, 0) 11.49%, rgba(255, 254, 250, 0.0128372) 12.05%, rgba(65, 244, 255, 0.1372) 17.48%, rgba(65, 244, 255, 0.26) 23.07%, rgba(65, 244, 255, 0.4) 28.76%, rgba(65, 244, 255, 0.5) 34.55%, rgba(65, 244, 255, 0.66) 40.51%, rgba(65, 244, 255, 0.85) 46.73%, #41F4FF 127.1%);`;
const timeLineBgGradient = `linear-gradient(90deg, #00A6E2 0%, #5B86E5 100%);`;

// NOTE: 새로 작업시 재설정
export const _color = {
  red: `#D20000`,
  white: `#ffffff`,
  black_hover: `#1F1E4F`,
  purple: `#726AA6`,
  purple_hover: `#5A509A`,
  purple_weak: `#F5F7FF`,
  purple_bg: `#F8F9FF`,
  purple_deep: `#353147`,
  green: `#309687`,
  green_hover: `#229987`,
  green_deep: `#00884F`,
  blue: `#00A6E2`,
  blue_hover: `#059CD2`,
  navy: `#26256F`,
  navy_hover: `#1a194d`,
  navy_deep: `#1e1d5e`,
  yellow: `#FEC600`,
  red_alert: `#be0000`,
  red_alert1: `#D20000`,
  red_icon: `#EA8484`,
  black_font: `#333333`,
  black_title: '#313136',
  black_font1: `#000`,
  purple_hoverBg: `rgba(224, 222, 236, 0.3)`,
  gray_text: `#666666`,
  gray_placeHolder: `#cacaca`,
  gray_week: `#EEEEEE`,
  gray_bg: `#F5F5FB`,
  gray_bg1: `#F4F4F4`,
  gray_border: `#BBBBBB`,
  gray_border2: `#E2E7EA`,
  gray_border4: `#cccccc`,
  gray_font: `#555555`,
  gray_week_font: `#999999`,
  gray_dashboard: `#FAFAFA`,
  gray_bg2: `#dddddd`,
  gray_bg3: `#A4A4A4`,
  gray_meterial: `#50575A`,
  gray_table: `#BFC9CE`,
  gray_icon: `#C6CBCD`,
  window_bg: `#353147`,
  blue_week_hover: `#F8FCFE`,
  blue_week: `#9DC7E0`,
  blue_font: `#47A7DF`,
  blue_line_bg: `#F0F7FB`,
  blue_cloud: `#5185D3`,
  btn_color: '#98B8CB',
  btn_color_hover: '#89ABBF',
  complete_btn: `#8938AF`,
  complete_btn_hover: `#75259A`,
  purple_bg_gradient: purpleBgGradient,
  scanner_gradient: scannerBgGradient,
  time_line_bg_gradient: timeLineBgGradient,
};

export const _deviceSize = {
  xl: 1920,
  // lg: 1460,
  lg: 1300,
  lgPadding: 10,
  md: 960,
  sm: 600,
  xs: 0,
};

export const _theme = {
  color: {
    primary: _color.blue, // 주 색상
    // secondary: ,  // 부 색상
    white: '#fff',
    gray: '#ccc',
    default: _color.black_font, // 기본 문자 색상
    error: _color.red, // 오류 색상
  },
};

export const _font = {
  notoSans: `"Noto Sans KR", sans-serif`,
  mulish: `"Mulish"`,
  roboto: `"Roboto"`,
  opensans: `"Open Sans"`,
};

// TEST:
export const responsive = {
  lgMore: `@media (min-width: ${_deviceSize.lg}px)`,
  mdMoreAndLess: `@media (min-width: ${_deviceSize.md}px) and (max-width: ${_deviceSize.lg - 1}px)`,
};
