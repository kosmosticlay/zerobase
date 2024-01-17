import { getCalendar, removeCalendar } from "./date-picker/index.js";

const $dateInput = document.querySelector(".date-input");

$dateInput.addEventListener("focus", function (event) {
  if ($dateInput.nextElementSibling) return;
  getCalendar();
});

document.addEventListener("click", function (event) {
  // 클릭된 요소가 input이면 removeCalendar 함수를 실행하지 않음
  const $calendar = document.querySelector(".calendar");
  if (event.target !== $dateInput) {
    if ($calendar) {
      removeCalendar($calendar, event);
    }
  }
});

/* 캘린더 월별 검색 */
// const $dateInput = document.querySelector(".date-input");

// // 입력창에 오늘의 날짜 표현
// let today = new Date();
// let todayYear = today.getFullYear();
// let todayMonth = today.getMonth();
// let todayDate = today.getDate();

// if (todayMonth < 9) {
//   todayMonth = "0" + (todayMonth + 1);
// } else {
//   todayMonth += 1;
// }

// if (todayDate < 10) {
//   todayDate = "0" + todayDate;
// }

// $dateInput.placeholder = `${todayYear}-${todayMonth}-${todayDate}`;
