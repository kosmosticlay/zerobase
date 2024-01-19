const $calendarContainer = document.querySelector(".calendar");
const $arrowBackward = document.querySelector(".arrow-backward");
let $headerYear = document.querySelector(".nav__header__year");
let $headerMonth = document.querySelector(".nav__header__month");

// 한국 시간 기준으로 date 객체 생성
const date = new Date();
const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
const kstGap = 9 * 60 * 60 * 1000;
const todayObj = new Date(utc + kstGap);
let currentObj;

// 월 이름
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function CreateDOM(element, className) {
  const $element = document.createElement(element);
  if (className) {
    $element.className = className;
  }
  return $element;
}

function getNavHeader(dateObj) {
  $headerYear.textContent = dateObj.getFullYear();
  $headerMonth.textContent = monthNames[dateObj.getMonth()];
}

function getCurrentObj(direction) {
  currentObj = new Date(
    parseInt($headerYear.textContent),
    monthNames.indexOf($headerMonth.textContent)
  );

  if (direction === "backward") {
    currentObj.setMonth(currentObj.getMonth() - 1);
    console.log(currentObj);
  } else if (direction === "forward") {
    currentObj.setMonth(currentObj.getMonth() + 1);
  }
  return currentObj;
}

export const updateNavHeader = (direction) => {
  if (!currentObj) {
    getNavHeader(todayObj);
    currentObj = todayObj;
  } else {
    currentObj = getCurrentObj(direction);
    getNavHeader(currentObj);
  }
};

// 화면에 캘린더를 출력
export const renderCalendar = () => {
  $calendarContainer.classList.remove("hidden");
  updateNavHeader();
};

// 화면에서 캘린더 제거
export const removeCalendar = ($calendar, event) => {
  if (!$calendar.contains(event.target)) {
    $calendarContainer.classList.add("hidden");
    currentObj = "";
  }
};
