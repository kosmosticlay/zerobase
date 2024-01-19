const $calendarContainer = document.querySelector(".calendar");
const $datesGrid = document.querySelector(".dates-grid");

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
  } else if (direction === "forward") {
    currentObj.setMonth(currentObj.getMonth() + 1);
  }
  return currentObj;
}

// 윤년 구하기
function checkLunarYear(year) {
  if (year % 400 === 0) {
    return true;
  } else if (year % 100 === 0) {
    return false;
  } else if (year % 4 === 0) {
    return true;
  } else {
    return false;
  }
}

// 각 월에 해당하는 달력 업데이트
function updateCalendarGrid(dateObj) {
  $datesGrid.innerHTML = "";
  const monthDayList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (dateObj.getMonth() === 1) {
    if (checkLunarYear(dateObj.getFullYear())) monthDayList[1] = 29;
  }

  const firstDayObj = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);

  const firstDay = firstDayObj.getDay();

  // 각 월의 1일을 기준으로 날짜 출력
  let tempArr = [];
  //지난달 i=3까지
  let preMonthObj = new Date(currentObj);
  preMonthObj.setMonth(preMonthObj.getMonth() - 1);
  let preMonthLastDate = monthDayList[preMonthObj.getMonth()];

  for (let i = 0; i < firstDay; i++) {
    const $tempLi = document.createElement("li");
    $tempLi.textContent = preMonthLastDate;
    $tempLi.classList.add("not-this-month");

    if (i === 0) {
      $datesGrid.appendChild($tempLi);
      tempArr.push(preMonthLastDate);
    } else {
      $datesGrid.insertBefore($tempLi, $datesGrid.firstChild);
      tempArr.unshift(preMonthLastDate);
    }
    preMonthLastDate--;
  }
  // 이번달
  for (let i = 0; i < monthDayList[dateObj.getMonth()]; i++) {
    const $tempLi = document.createElement("li");
    $tempLi.textContent = i + 1;

    $datesGrid.appendChild($tempLi);

    tempArr.push(i + 1);
  }

  // 다음달
  let totalDaysNeeded = 42;
  let remainDays = totalDaysNeeded - tempArr.length;

  for (let i = 0; i < remainDays; i++) {
    const $tempLi = document.createElement("li");
    $tempLi.textContent = i + 1;
    $tempLi.classList.add("not-this-month");

    $datesGrid.appendChild($tempLi);

    tempArr.push(i + 1);
  }
  console.log(tempArr);
}

export const updateNavHeader = (direction) => {
  if (!currentObj) {
    getNavHeader(todayObj);
    currentObj = todayObj;
  } else {
    currentObj = getCurrentObj(direction);
    getNavHeader(currentObj);
  }
  updateCalendarGrid(currentObj);
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
