// 현재 선택 중인 카테고리
let globeCategory;

const $root = document.querySelector("#root");

const API_KEY = "adcae596004446108cfadfae2a2fa775";

function CreateDOM(element, className) {
  const $el = document.createElement(element);
  if (!className) return $el;
  $el.className = className;

  return $el;
}

// 현재 로드된 페이지 수
let currentPage = 1;

async function fetchData(obj) {
  const fetchUrl = `https://newsapi.org/v2/top-headlines?country=kr&category=${
    obj.category === "all" ? "" : obj.category
  }&page=${currentPage}&pageSize=5&apiKey=${API_KEY}`;

  try {
    const response = await axios.get(fetchUrl);
    return response.data;
  } catch (error) {
    console.log("에러났네!? : ", error);
  }
}

function CreateNewsItem(dataObj) {
  // thumbnail DOM 생성
  const $thumbnail = CreateDOM("div", "thumbnail");

  const $thumbnailLink = document.createElement("a");
  $thumbnailLink.href = dataObj.url;
  $thumbnailLink.target = "_blank";
  $thumbnailLink.rel = "noopener norefferer";

  const $img = document.createElement("img");
  $img.src =
    dataObj.urlToImage ||
    "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
  $img.alt = "thumbnail";

  $thumbnailLink.appendChild($img);
  $thumbnail.appendChild($thumbnailLink);

  // contents DOM 생성
  const $contents = CreateDOM("div", "contents");

  const $h2El = document.createElement("h2");
  const $contentsLink = document.createElement("a");
  $contentsLink.href = dataObj.url;
  $contentsLink.target = "_blank";
  $contentsLink.rel = "noopener norefferer";
  $contentsLink.textContent = dataObj.title;

  $h2El.appendChild($contentsLink);
  $contents.appendChild($h2El);

  const $pEl = document.createElement("p");
  $pEl.textContent = dataObj.description || "";

  $contents.appendChild($pEl);

  // 생성한 thumbnail과 contents를 위한 컨테이너 생성
  const $newsItem = CreateDOM("section", "news-item");
  $newsItem.appendChild($thumbnail);
  $newsItem.appendChild($contents);

  return $newsItem;
}

async function renderNewsList(obj) {
  // fetchData 함수 호출 수정: 페이지 번호를 파라미터로 전달
  const newsData = await fetchData(obj, currentPage);
  const newsArray = newsData.articles;

  const $newsList =
    document.querySelector(".news-list") || CreateDOM("article", "news-list");

  newsArray.forEach((newsItem) => {
    const $newsItem = CreateNewsItem(newsItem);
    $newsList.appendChild($newsItem);
  });

  updateObserver();
}

// 현재 선택중인 카테고리를 기준으로 데이터 추가로 로드하기
async function loadMore() {
  currentPage += 1;
  await renderNewsList(globeCategory);
}

// Intersection Observer이 감지시 실행 할 콜백함수
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadMore();
    }
  });
};

// Intersection Observer 생성
const observer = new IntersectionObserver(observerCallback, {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
});

// 페이지 가장 마지막 요소에 옵저버 등록
function updateObserver() {
  const lastElement = document.querySelector(".news-list").lastElementChild;
  if (lastElement) {
    observer.observe(lastElement);
  }
}

// NewsList 구조 생성 -> 페이지 로드 후 렌더링(renderNewsList)
export default function NewsList(obj) {
  globeCategory = obj;

  let $newsListContainer = document.querySelector(".news-list-container");
  let $newsList = document.querySelector(".news-list");

  if (!$newsListContainer) {
    $newsListContainer = CreateDOM("div", "news-list-container");
    $newsList = CreateDOM("article", "news-list");
  }

  $newsList.innerHTML = "";

  renderNewsList(obj);

  $newsListContainer.appendChild($newsList);
  $root.appendChild($newsListContainer);
}
