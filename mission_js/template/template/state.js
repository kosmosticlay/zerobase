const KEY = "state";

export const saveState = (state) => {
  if (typeof state !== "object") {
    throw new TypeError("매개변수 state에는 객체가 전달되어야 합니다.");
  }
  const localStateValue = JSON.stringify(state);
  localStorage.setItem(KEY, localStateValue);
};

export const loadState = () => {
  const localStateValue = localStorage.getItem(KEY);
  return JSON.parse(localStateValue);
};
