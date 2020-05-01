import {
  HOST,
  GET_PROFILE_PENDING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
} from "../config/constant";

export function getProfile(dispatch) {
  dispatch({ type: GET_PROFILE_PENDING });
  fetch(HOST + "/profile", {
      method: "GET",
      credentials: "include"
    })
    .then((res) => res.json())
    .then((user) => {
      dispatch({ type: GET_PROFILE_SUCCESS, payload: user })
    })
    .catch((err) => dispatch({ type: GET_PROFILE_FAILED, payload: err }));
}