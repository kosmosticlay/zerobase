const StarRating = (container) => {
  const starContainer = document.createElement("div");
  starContainer.className = "star-rating-container";

  // 컨테이너의 data-maxRating으로부터 최대 별점 수 로드 / 현재 선택된 별점 수
  const maxRating = parseInt(container.dataset.maxRating);
  let currentRating = 0;

  // 마우스 오버시 해당 별까지 하이라이트
  const hoverStars = (rating) => {
    Array.from(starContainer.children).forEach((star, index) => {
      star.classList.toggle("hovered", index < rating);
    });
  };

  // 선택한 별 수 만큼 고정
  const updateStars = (rating) => {
    Array.from(starContainer.children).forEach((star, index) => {
      star.classList.toggle("selected", index < rating);
    });
  };

  // maxRating 수만큼 star 아이콘 생성 후, 각 아이콘마다 이벤트 등록
  for (let i = 0; i < maxRating; i++) {
    const star = document.createElement("i");
    star.className = "bx bxs-star";
    star.addEventListener("mouseover", () => {
      currentRating = i + 1;
      hoverStars(i + 1);
    });
    star.addEventListener("mouseout", () => hoverStars(0));
    star.addEventListener("click", () => {
      currentRating = i + 1;
      updateStars(currentRating);
      container.dispatchEvent(
        new CustomEvent("rating-change", { detail: currentRating })
      );
    });
    starContainer.appendChild(star);
  }

  container.appendChild(starContainer);

  // 초기 별점 상태 업데이트
  updateStars(currentRating);
};

export default StarRating;
