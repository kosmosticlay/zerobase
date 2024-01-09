const StarRating = (container) => {
  const starContainer = document.createElement("div");
  starContainer.className = "star-rating-container";

  const maxRating = parseInt(container.dataset.maxRating);
  let currentRating = 0;

  const hoverStars = (rating) => {
    Array.from(starContainer.children).forEach((star, index) => {
      star.classList.toggle("hovered", index < rating);
    });
  };

  const updateStars = (rating) => {
    Array.from(starContainer.children).forEach((star, index) => {
      star.classList.toggle("selected", index < rating);
    });
  };

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
  updateStars(currentRating);
};

export default StarRating;
