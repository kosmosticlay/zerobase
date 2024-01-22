// do something!
const $root = document.querySelector("#root");

const categoryList = [
  {
    category: "all",
    text: "전체보기",
  },
  { category: "business", text: "비즈니스" },
  { category: "entertainment", text: "엔터테인먼트" },
  { category: "health", text: "건강" },
  { category: "science", text: "과학" },
  { category: "sports", text: "스포츠" },
  { category: "technology", text: "기술" },
];

// Nav HTML 동적 생성하기
export default function Nav() {
  const $nav = document.createElement("nav");
  $nav.className = "category-list";

  const $ul = document.createElement("ul");

  for (let i = 0; i < categoryList.length; i++) {
    const $li = document.createElement("li");
    $li.id = categoryList[i].category;
    $li.textContent = categoryList[i].text;
    if (i === 0) {
      $li.className = "category-item active";
    } else {
      $li.className = "category-item";
    }

    $ul.appendChild($li);
  }
  $nav.appendChild($ul);
  $root.appendChild($nav);
}
