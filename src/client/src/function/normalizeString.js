export default function normalizeString(s) {
  let temp = s;
  temp = temp.toLowerCase();
  temp = temp.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  temp = temp.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  temp = temp.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  temp = temp.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  temp = temp.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  temp = temp.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  temp = temp.replace(/đ/g, "d");
  temp = temp.replace(
    /!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'|"|&|#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  temp = temp.replace(/ + /g, " ");
  temp = temp.trim();
  return temp;
}
