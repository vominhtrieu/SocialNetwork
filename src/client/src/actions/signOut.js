import {
  HOST,
  SIGN_OUT_PENDING,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILED,
} from '../config/constant';

export function signOut(dispatch) {
  dispatch({ type: SIGN_OUT_PENDING });
  fetch(HOST + '/profile', {
    method: 'GET',
    credentials: 'include',
  })
    .then((res) => {
      console.log(res);
      if (res.ok) dispatch({ type: SIGN_OUT_SUCCESS });
      throw new Error('Unauthenticated');
    })
    .catch((err) => dispatch({ type: SIGN_OUT_FAILED, payload: err }));
}
