export function formatDate(time) {
  let current_datetime = new Date(time);
  return `${
    (current_datetime.getDate() < 10
      ? `0${current_datetime.getDate()}`
      : current_datetime.getDate()) +
    "-" +
    (current_datetime.getMonth() + 1 < 10
      ? `0${current_datetime.getMonth() + 1}`
      : current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getFullYear()
  }`;
}

export function formCurencyVN(price) {
  return price.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}

export function priceForChildren(price) {
  let priceForChildren = (price / 100) * 75;
  return priceForChildren.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}

export function checkTokenLogin() {
  return localStorage.getItem("Token") ? true : false;
}

export function checkTokenLoginAdmin() {
  let admin = JSON.parse(localStorage.getItem("TokenAdmin"));
  return admin && admin.role === "admin" ? true : false;
}

export function removeAccents(str) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ",
    "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ",
  ];

  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}

export function convertStrToTag(str) {
  let char = str
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((x) => x !== "")
    .join("");
  return removeAccents(char);
}
