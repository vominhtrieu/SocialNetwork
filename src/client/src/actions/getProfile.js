import axios from "axios";
import { API_HOST, GET_PROFILE_PENDING, GET_PROFILE_SUCCESS, GET_PROFILE_FAILED } from "../config/constant";
axios.defaults.withCredentials = true;

export function getProfile(dispatch) {
  dispatch({ type: GET_PROFILE_PENDING });
  axios
    .get(API_HOST + "/profile")
    .then((res) => {
      dispatch({ type: GET_PROFILE_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: GET_PROFILE_FAILED, payload: err });
    });
}
