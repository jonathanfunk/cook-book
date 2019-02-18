import { REQUEST_SENT, REQUEST_COMPLETE } from './../actions/types';

const initialState = {
  requestSent: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SENT:
      return {
        ...state,
        requestSent: true
      };
    case REQUEST_COMPLETE:
      return {
        ...state,
        requestSent: false
      };
    default:
      return state;
  }
}
