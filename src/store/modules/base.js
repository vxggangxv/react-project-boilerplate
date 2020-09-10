import { handleActions } from 'redux-actions';
import { SpreadSagas } from 'lib/asyncUtils';
import * as actions from 'store/actions';

const initialState = {
  // NOTE: 초기 랜딩중일 경우 true, false일 경우 화면 랜딩 완료
  landing: true,
  // NOTE: api통신 pending, success, failure에 따른 자동 loading show
  apiCalling: false,
  // NOTE: router에 error 연결(e.g serverError : 500)
  responseStatus: null,
  // responseStatus: 401,
  // TODO: 차후 error toasty또는 popup과 연결 예정
  responseError: {
    isShow: false,
    message: null,
    data: null,
  },
  language: 'en',
  popup: {
    title: '',
    content: '',
    button: '',
    hideButton: false,
    reverseButton: false,
    okText: '',
    okLink: '',
    cancelLink: '',
    isOpen: false,
    width: 350,
    type: '',
    key: '',
    dim: null,
    onClick: () => {},
    onCancel: () => {},
    onExited: () => {},
    align: [],
    paddingNone: false,
  },
};

const SpreadReducer = SpreadSagas({ state: initialState });

export default handleActions(
  {
    ...new SpreadReducer(null, actions.SET_API_CALLING_STATUS, {
      callback: (draft, { payload: diff }) => {
        // console.log(diff, 'diff apiCalling');
        draft.apiCalling = diff;
      },
    }),
    ...new SpreadReducer(null, actions.EXIT_LANDING, {
      callback: (draft, { payload: diff }) => {
        draft.landing = false;
        // console.log(draft.landing, 'exit_landing');
      },
    }),
    ...new SpreadReducer(null, actions.RESPONSE_STATUS, {
      callback: (draft, { payload: diff }) => {
        // DEBUG: 필요
        draft.responseStatus = diff;
      },
    }),
    ...new SpreadReducer(null, actions.RESPONSE_ERROR, {
      callback: (draft, { payload: diff }) => {
        // DEBUG: 필요
        draft.responseError.message = diff.message;
        draft.responseError.data = diff;
      },
    }),
    ...new SpreadReducer(null, actions.LANGUAGE_CHANGE, {
      callback: (draft, { payload: diff }) => {
        draft.language = diff;
      },
    }),
    ...new SpreadReducer(null, actions.BASE_POPUP, {
      callback: (draft, { payload: diff }, state) => {
        const {
          type = 'alert',
          title = '',
          content = '',
          button = '',
          reverseButton = false,
          hideButton = false,
          onClick = () => {},
          onCancel = () => {},
          onExited = () => {},
          align = [],
          okText = '',
          okLink = '',
          cancelLink = '',
          isOpen = false,
          key = '',
          dim = true,
          width = 534,
          paddingNone = false,
        } = diff;

        if (type === 'dim') {
          draft.popup.isOpen = false;
        } else {
          draft.popup.title = title;
          draft.popup.content = content;
          draft.popup.button = button;
          draft.popup.reverseButton = reverseButton;
          draft.popup.hideButton = hideButton;
          draft.popup.onClick = onClick;
          draft.popup.onCancel = onCancel;
          draft.popup.onExited = onExited;
          draft.popup.okText = okText;
          draft.popup.okLink = okLink;
          draft.popup.cancelLink = cancelLink;
          draft.popup.align = align;
          draft.popup.isOpen = isOpen;
          draft.popup.type = type;
          draft.popup.key = key;
          draft.popup.dim = dim;
          draft.popup.width = width;
          draft.popup.paddingNone = paddingNone;
        }
      },
    }),
  },
  initialState,
);
