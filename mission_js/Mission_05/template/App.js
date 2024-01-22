// do something!

import { Nav, NewsList } from "./components/index.js";

// 전역 카테고리
let globeCategory = {
  category: "all",
};

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

// (최초) Nav와 NewsList 동적 생성
Nav();
NewsList(globeCategory);

const $categoryBtnList = document.querySelector(".category-list > ul");

// proxy Handler 객체 생성
const categoryHandlerObj = {
  set(obj, prop, val) {
    obj[prop] = val;
    NewsList(obj); // 카테고리가 변경될 때마다 NewsList 호출
    return true;
  },
};

// 전역 카테고리 객체에 대한 프록시 객체 생성
const proxyCategory = new Proxy(globeCategory, categoryHandlerObj);

// 카테고리 버튼 클릭 시 프록시 객체 변경 -> NewsList 재호출
$categoryBtnList.addEventListener("click", (event) => {
  const $categoryList = $categoryBtnList.querySelectorAll("li");
  $categoryList.forEach(($category) => {
    $category.classList.remove("active");
    if (event.target === $category) {
      $category.classList.add("active");
      const newCategory = categoryList.find(
        (categoryObj) => categoryObj.category === $category.id
      );
      proxyCategory.category = newCategory.category;
    }
  });
});
