"use strict";

const modalHeading = document.querySelector(".modal-heading");
const clickMe = document.querySelector(".click-me");
const clickYes = document.querySelector(".click-yes");
const clickCancel = document.querySelector(".click-cancel");
const modal = document.querySelector(".modal-window");
const overlay = document.querySelector(".overlay");
const confirmMsg = document.querySelector(".confirm-msgs");


const openModal = function (text) {
  overlay.classList.remove("hidden");
  modal.style.display = "flex";
  modalHeading.innerHTML = text;
};

const closeModal = function(text){
  overlay.classList.add("hidden");
  modal.style.display = "none";
  return text;
}

const writeMsg = function(text){
  confirmMsg.insertAdjacentHTML("beforeend", `<p> ${text} </p>`);
};

clickMe.addEventListener("click", function () {
  openModal(clickMe.dataset.heading);
});

clickYes.addEventListener("click", function () {
  writeMsg(closeModal(clickYes.dataset.heading));
});

clickCancel.addEventListener("click", function () {
  writeMsg(closeModal(clickCancel.dataset.heading));
});




