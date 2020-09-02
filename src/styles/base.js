import { css, createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { fontFamily, disableDrag } from 'styles/utils';
import { ENV_MODE_PROD } from 'lib/setting';

const globalStyle = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box !important;
    ${ENV_MODE_PROD && disableDrag}
  }
  input,
  textarea,
  select,
  a,
  button {
    outline: none;
    box-shadow: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  body {
    ${fontFamily}
    font-size: 14px;
    color: #333;
    /* min-width: 1900px; */
  }
  .hidden {
    display: none !important;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    padding: 0;
    margin: -1px;
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
  }
  .padding-none {
    padding: 0 !important;
  }
  .margin-none {
    margin: 0 !important;
  }
`;

export default globalStyle;
