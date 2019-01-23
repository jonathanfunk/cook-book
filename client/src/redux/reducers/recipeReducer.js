import { LOADING, GET_RECIPE } from './../actions/types';

const initialState = {
  recipe: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
