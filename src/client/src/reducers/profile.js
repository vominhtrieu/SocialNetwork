import {
  GET_PROFILE_PENDING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
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
      return Object.assign({}, state, { isPending: true });
    case GET_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload,
        socket: io(HOST),
        isPending: false,
      });
    case GET_PROFILE_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });
    default:
      return state;
  }
}
