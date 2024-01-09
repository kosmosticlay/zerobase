import { saveState, loadState } from "./state.js";

const $nav = document.querySelector("nav");

function toggleNav(isOpen) {
  $nav.classList.toggle("active", isOpen);
  document.body.style.visibility = "visible";
}

function initNav() {
  const state = loadState();
  return state ? state.isNavOpen : false;
}

let isNavOpen = initNav();

function setupEventListeners() {
  window.addEventListener("DOMContentLoaded", () => toggleNav(isNavOpen));

  document.querySelector(".toggle").addEventListener("click", () => {
    isNavOpen = !isNavOpen;
    document.body.classList.remove("preload");
    toggleNav(isNavOpen);
  });

  window.addEventListener("beforeunload", () => saveState({ isNavOpen }));
}

setupEventListeners();
