import { AUTHORIZE } from "../constant";

export function setAuthorize(isAccept) {
  return {
    type: AUTHORIZE,
    payload: isAccept,
  };
}