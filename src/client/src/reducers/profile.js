import {
  GET_PROFILE_PENDING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
  SIGN_OUT_PENDING,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILED,
  HOST,
} from "../config/constant";
import io from "socket.io-client";

const initialState = {
  user: {},
  socket: null,
  isPending: true,
  error: "",
};

export function profile(state = initialState, action = {}) {
  switch (action.type) {
    case GET_PROFILE_PENDING:
    case SIGN_OUT_PENDING:
      return Object.assign({}, state, { isPending: true });

    case SIGN_OUT_SUCCESS:
      return Object.assign({}, state, {
        user: null,
        socket: null,
        isPending: null,
        error: null,
      });
    case GET_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload,
        socket: io(HOST),
        isPending: false,
        error: null,
      });
    case GET_PROFILE_FAILED:
    case SIGN_OUT_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });

    default:
      return state;
  }
}
