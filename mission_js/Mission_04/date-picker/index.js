function CreateDOM(element, className) {
  const $element = document.createElement(element);
  if (className) {
    $element.className = className;
  }
  return $element;
}

function renderCalendarNav() {
  const $fragment = document.createDocumentFragment();
  const $nav = CreateDOM("nav", "calendar-nav");
  //
  const $arrowLeft = CreateDOM("div", "arrow arrow-backward");
  $arrowLeft.textContent = "◀";
  $nav.appendChild($arrowLeft);

  const $navHeader = CreateDOM("div", "nav__header");
  const $headerMonth = CreateDOM("span", "nav__header-month");
  const $headerYear = CreateDOM("span", "nav__header-year");

  $navHeader.appendChild($headerMonth);
  $navHeader.appendChild($headerYear);

  $nav.appendChild($navHeader);

  const $arrowRight = CreateDOM("div", "arrow arrow-forward");
  $arrowRight.textContent = "▶";
  $nav.appendChild($arrowRight);

  //
  $fragment.appendChild($nav);
  return $fragment;
}

function renderCalendarGrid() {
  const $fragment = document.createDocumentFragment();
  const $grid = CreateDOM("div", "calendar-grid");
  // day 채우기
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const $dayList = CreateDOM("ul", "calendar-grid__day-list");
  for (let each of dayNames) {
    const $day = CreateDOM("li");
    $day.textContent = each;
    $dayList.appendChild($day);
  }
  $grid.appendChild($dayList);
  //
  const $dateList = CreateDOM("div", "calendar-grid__date-list");
  $grid.appendChild($dateList);
  //
  $fragment.appendChild($grid);
  return $fragment;
}

function getMonthObj(num) {
  let current;

  switch (num) {
    case 0:
      current = { monthNumber: 0, monthName: "January" };
      break;
    case 1:
      current = { monthNumber: 1, monthName: "February" };
      break;
    case 2:
      current = { monthNumber: 2, monthName: "March" };
      break;
    case 3:
      current = { monthNumber: 3, monthName: "April" };
      break;
    case 4:
      current = { monthNumber: 4, monthName: "May" };
      break;
    case 5:
      current = { monthNumber: 5, monthName: "June" };
      break;
    case 6:
      current = { monthNumber: 6, monthName: "July" };
      break;
    case 7:
      current = { monthNumber: 7, monthName: "August" };
      break;
    case 8:
      current = { monthNumber: 8, monthName: "September" };
      break;
    case 9:
      current = { monthNumber: 9, monthName: "October" };
      break;
    case 10:
      current = { monthNumber: 10, monthName: "November" };
      break;
    case 11:
      current = { monthNumber: 11, monthName: "December" };
      break;
  }
  return current;
}

function updateNav(obj) {
  let currentObj;
  let currentNum = 0;
  if (!currentObj) {
    currentObj = new Date();
    currentNum = currentObj.getMonth();
  } else {
    currentObj = obj;
    currentNum = currentObj.monthNumber;
  }

  const $headerMonth = document.querySelector(".nav__header-month");

  const currentMonth = getMonthObj(currentNum);

  $headerMonth.textContent = currentMonth.monthName;
  $headerMonth.setAttribute("data-month-number", currentMonth.monthNumber);

  const $headerYear = document.querySelector(".nav__header-year");
  $headerYear.textContent = currentObj.getFullYear();

  const $arrowLeft = document.querySelector(".arrow-backward");
  const $arrowRight = document.querySelector(".arrow-forward");

  $arrowLeft.addEventListener("click", function () {
    let $currentYear = document.querySelector(".nav__header-year");
    let $currentMonth = document.querySelector(".nav__header-month");
    let $currentMonthNum = $currentMonth.getAttribute("data-month-number"); // 0

    if (parseInt($currentMonthNum) === 0) {
      let currentYearNum = parseInt($currentYear.textContent);
      console.log(currentYearNum);
      currentYearNum--;
      console.log(currentYearNum);
      $currentYear.textContent = currentYearNum;

      $currentMonthNum = 11;
    } else {
      $currentMonthNum--;
    }

    updateNav({ monthNumber: $currentMonthNum });
  });
  $arrowRight.addEventListener("click", function () {
    // console.log($arrowRight);
  });
}

function renderCalendar($calendar) {
  $calendar.appendChild(renderCalendarNav());
  $calendar.appendChild(renderCalendarGrid());

  setTimeout(updateNav, 0);

  return $calendar;
}

export const getCalendar = () => {
  const $mainWrap = document.querySelector(".mainWrap");
  const $calendar = document.createElement("div");
  $calendar.className = "calendar";
  renderCalendar($calendar);
  $mainWrap.appendChild($calendar);

  const updateWidth = function (_, width) {
    document.documentElement.style.setProperty("--calendar-size", width + "px");
  };

  const ro = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const newWidth = entry.contentRect.width;
      updateWidth($calendar, newWidth);
    });
  });

  if ($calendar) {
    ro.observe($calendar);
  }
};

export const removeCalendar = ($calendar, event) => {
  // 클릭된 위치가 달력 밖이면 달력을 제거
  if (!$calendar.contains(event.target)) {
    const $mainWrap = document.querySelector(".mainWrap");
    $mainWrap.removeChild($calendar);
  }
};
