import {
  renderCalendar,
  removeCalendar,
  updateNavHeader,
} from "./date-picker/index.js";

const $calendar = document.querySelector(".calendar");
const $dateInput = document.querySelector(".date-input");
const $arrowBackward = document.querySelector(".arrow-backward");
const $arrowForward = document.querySelector(".arrow-forward");

// 요소 크기 변화 옵저버 생성
const ro = new ResizeObserver((entries) => {
  for (let entry of entries) {
    let newWidth = entry.contentRect.width;
    if (newWidth > 500) {
      newWidth = 500;
    }
    document.documentElement.style.setProperty(
      "--calendar-width",
      `${newWidth}px`
    );
  }
});

ro.observe($calendar);

// 캘린더 생성 및 제거
$dateInput.addEventListener("focus", renderCalendar);
document.addEventListener("click", function (event) {
  // 클릭된 요소가 input이면 removeCalendar 함수를 실행하지 않음

  if (event.target !== $dateInput) {
    removeCalendar($calendar, event);
  }
});

// 캘린더에서 이전/다음 월 이동
$arrowBackward.addEventListener("click", () => {
  updateNavHeader("backward");
});
$arrowForward.addEventListener("click", () => {
  updateNavHeader("forward");
});
