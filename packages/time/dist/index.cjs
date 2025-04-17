'use strict';

function getCurrentTime() {
  return /* @__PURE__ */ new Date();
}
function getCurrentTimestamp() {
  return Date.now();
}

function getCurrentTimeString(format = "YYYY-MM-DD HH:mm:ss") {
  const now = /* @__PURE__ */ new Date();
  const formatMap = {
    YYYY: String(now.getFullYear()),
    MM: String(now.getMonth() + 1).padStart(2, "0"),
    DD: String(now.getDate()).padStart(2, "0"),
    HH: String(now.getHours()).padStart(2, "0"),
    mm: String(now.getMinutes()).padStart(2, "0"),
    ss: String(now.getSeconds()).padStart(2, "0")
  };
  return format.replace(/(YYYY|MM|DD|HH|mm|ss)/g, (match) => formatMap[match]);
}

function getCurrentWeekDay() {
  const weekDays = ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"];
  const now = /* @__PURE__ */ new Date();
  return `\u5468${weekDays[now.getDay()]}`;
}

exports.getCurrentTime = getCurrentTime;
exports.getCurrentTimeString = getCurrentTimeString;
exports.getCurrentTimestamp = getCurrentTimestamp;
exports.getCurrentWeekDay = getCurrentWeekDay;
