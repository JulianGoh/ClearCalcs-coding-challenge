"use strict";


const modalHeading = document.querySelector(".modal-heading");
const clickMe = document.querySelector(".click-me");
const clickYes = document.querySelector(".click-yes");
const clickCancel = document.querySelector(".click-cancel");
const modal = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const confirmMsg = document.querySelector('.confirm-msgs');

clickMe.addEventListener('click', function(){
  overlay.classList.remove('hidden');
  modal.style.display = 'flex';
  modalHeading.innerHTML = 'Are you sure you want to continue?';
});

clickYes.addEventListener('click', function(){
  overlay.classList.add('hidden');
  modal.style.display = 'none';
  confirmMsg.insertAdjacentHTML('beforeend', 'You just clicked "Yes"');
})

clickCancel.addEventListener('click', function(){
  overlay.classList.add('hidden');
  modal.style.display = 'none';
  confirmMsg.insertAdjacentHTML('beforeend', 'You just clicked "Cancel"');
})




/*
class View {
  constructor() {}

  openModal = (text) => {};
}

class Controller {
  constructor(view) {
    this.view = view;
  }
}

const app = new Controller(new View());
*/