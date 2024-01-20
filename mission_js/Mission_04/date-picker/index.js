const $calendarContainer = document.querySelector(".calendar");
const $dateInput = document.querySelector(".date-input");
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
const monthNamesList = [
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

const monthDayList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function getNavHeader(dateObj) {
  $headerYear.textContent = dateObj.getFullYear();
  $headerMonth.textContent = monthNamesList[dateObj.getMonth()];
}

function getCurrentObj(direction) {
  currentObj = new Date(
    parseInt($headerYear.textContent),
    monthNamesList.indexOf($headerMonth.textContent)
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
    $tempLi.classList.add("this-month");

    $datesGrid.appendChild($tempLi);

    tempArr.push(i + 1);
  }

  // 다음달
  let totalDaysNeeded = 42;
  let remainDays = totalDaysNeeded - tempArr.length;

  for (let i = 0; i < remainDays; i++) {
    const $tempLi = document.createElement("li");
    $tempLi.textContent = i + 1;

    $datesGrid.appendChild($tempLi);

    tempArr.push(i + 1);
  }
}

function pickDate(todayObj) {
  const $navHeaderMonth = document.querySelector(".nav__header__month");
  const $navHeaderYear = document.querySelector(".nav__header__year");
  if (
    monthNamesList[todayObj.getMonth()] === $navHeaderMonth.textContent &&
    todayObj.getFullYear() === parseInt($navHeaderYear.textContent)
  ) {
    const datePicked = todayObj.getDate(); // 19
    const $thisMonthDates = document.querySelectorAll(".this-month");
    const [liPicked] = [...$thisMonthDates].filter(
      (_, idx) => idx === datePicked - 1
    );

    liPicked.classList.add("circle");
  }
}

function renderDatePicked(currentObj) {
  const $dates = document.querySelectorAll(".this-month");
  $dates.forEach(($date) => {
    $date.addEventListener("click", () => {
      const prePicked = document.querySelector(".picked");
      if (prePicked) {
        prePicked.classList.remove("picked");
      }
      $date.classList.add("picked");

      const yearPicked = currentObj.getFullYear();
      let monthPicked = currentObj.getMonth();
      if (monthPicked < 10) {
        monthPicked = "0" + (monthPicked + 1);
      } else {
        monthPicked++;
      }
      let datePicked = parseInt($date.textContent);
      if (datePicked < 10) {
        datePicked = "0" + datePicked;
      }

      $dateInput.value = `${yearPicked}-${monthPicked}-${datePicked}`;

      // localstorage에 저장하기
      const dateSelected = [yearPicked, monthPicked, datePicked];
      localStorage.setItem("dateSelected", JSON.stringify(dateSelected));
    });
  });
}

function renderDateSaved() {
  const $navHeaderMonth = document.querySelector(".nav__header__month");
  const dateSelected = JSON.parse(localStorage.getItem("dateSelected"));
  const dateSelectedDate = parseInt(dateSelected[2]);

  if (
    monthNamesList[parseInt(dateSelected[1]) - 1] ===
    $navHeaderMonth.textContent
  ) {
    const $dates = document.querySelectorAll(".this-month");
    $dates.forEach(($date) => {
      if (parseInt($date.textContent) === dateSelectedDate) {
        $date.classList.add("picked");
      }
    });
  }
}

function renderToday() {
  const $navHeaderMonth = document.querySelector(".nav__header__month");
  const $navHeaderYear = document.querySelector(".nav__header__year");
  const $dates = document.querySelectorAll(".this-month");
  if (todayObj.getFullYear() === parseInt($navHeaderYear.textContent)) {
    $dates.forEach(($date) => {
      if (
        monthNamesList[todayObj.getMonth()] === $navHeaderMonth.textContent &&
        parseInt($date.textContent) === todayObj.getDate()
      ) {
        $date.classList.add("circle");
      }
    });
  }
}

function renderHolidays() {
  const firstDayOfMonth = new Date(
    currentObj.getFullYear(),
    currentObj.getMonth(),
    1
  ).getDay();
  const firstHolidayDate = 7 - firstDayOfMonth + 1;
  let holidayList = [];
  let i = firstHolidayDate;
  while (i <= monthDayList[currentObj.getMonth()]) {
    holidayList.push(i);
    i += 7;
  }

  const $dates = document.querySelectorAll(".this-month");
  $dates.forEach(($date) => {
    if (holidayList.includes(parseInt($date.textContent))) {
      $date.classList.add("holiday");
    }
  });
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
  renderDatePicked(currentObj);
  if (localStorage.length !== 0) {
    renderDateSaved();
  }
  renderToday();
  renderHolidays();
};

// 화면에 캘린더를 출력
export const renderCalendar = () => {
  $calendarContainer.classList.remove("hidden");
  updateNavHeader();
  //pickDate(todayObj);
};

// 화면에서 캘린더 제거
export const removeCalendar = ($calendar, event) => {
  if (!$calendar.contains(event.target)) {
    $calendarContainer.classList.add("hidden");
    currentObj = "";
  }
};
