"use strict";

// //Initialise query selectors
// const modalHeading = document.querySelector(".modal-heading");
// const clickMe = document.querySelector(".click-me");
// const clickMe2 = document.querySelector(".click-me2");
// const clickYes = document.querySelector(".click-yes");
// const clickCancel = document.querySelector(".click-cancel");
// const modal = document.querySelector(".modal-window");
// const overlay = document.querySelector(".overlay");
// const confirmMsg = document.querySelector(".confirm-msgs");

// //DRY - openModal function
// const openModal = function (text) {
//   overlay.classList.remove("hidden");
//   modal.style.display = "flex";
//   modalHeading.innerHTML = text;
//   return text;
// };

// //DRY - closeModal function
// const closeModal = function (text) {
//   overlay.classList.add("hidden");
//   modal.style.display = "none";
//   return text;
// };

// //Outputs confirmation msg onto main page
// const writeMsg = function (text) {
//   confirmMsg.insertAdjacentHTML("beforeend", `<p> ${text} </p>`);
// };

// //Btns eventlistener

// clickMe.addEventListener("click", function () {
//   openModal(clickMe.dataset.heading);
// });

// clickMe2.addEventListener("click", function () {
//   openModal(clickMe2.dataset.heading);
// });

// clickYes.addEventListener("click", function () {
//   writeMsg(closeModal(clickYes.dataset.heading));
// });

// clickCancel.addEventListener("click", function () {
//   writeMsg(closeModal(clickCancel.dataset.heading));
// });

/* --- EVEN BETTER IF --- */

const clickMe = document.querySelector(".click-me");
const clickMe2 = document.querySelector(".click-me2");
const confirmMsg = document.querySelector(".confirm-msgs");

clickMe.addEventListener("click", async () => {

  //Create new instance of Component
  const newModal = new Component({
    questionHeading: `${clickMe.dataset.heading}`,
  });

  //Await for yes/no feedback
  const printMsgConfirm = await newModal.confirm();
  if (printMsgConfirm)
    confirmMsg.insertAdjacentHTML(
      "beforeend",
      `<p> ${newModal.yesBtn.dataset.heading} </p>`
    );
  else {
    confirmMsg.insertAdjacentHTML(
      "beforeend",
      `<p> ${newModal.cancelBtn.dataset.heading} </p>`
    );
  }
});

clickMe2.addEventListener("click", async () => {
  const newModal = new Component({
    questionHeading: `${clickMe2.dataset.heading}`,
  });

  const printMsgConfirm = await newModal.confirm();
  printMsgConfirm
    ? newModal.printMsg(newModal.cancelBtn.dataset.heading)
    : newModal.printMsg(newModal.cancelBtn.dataset.heading);
});

class Component {
  constructor({ questionHeading }) {
    this.questionHeading = questionHeading;

    this.modal = undefined;
    this.overlay = undefined;
    this.yesBtn = undefined;
    this.cancelBtn = undefined;
    this.parent = document.body;

    this._createModal();
    this._appendModal();
    this._openModal();
  }

  confirm() {
    return new Promise((resolve, reject) => {
      const error = !this.questionHeading;
      if (error) {
        reject("Missing heading question");
        return;
      }
      // openModal();

      this.yesBtn.addEventListener("click", () => {
        resolve(true);
        this._destroy();
        this._closeModal();
      });

      this.cancelBtn.addEventListener("click", () => {
        resolve(false);
        this._destroy();
        this._closeModal();
      });
    });
  }
  _openModal() {
    this.overlay = document.createElement("div");
    this.overlay.classList.add("overlay");
    this.modal.style.display = "flex";
    this.parent.appendChild(this.overlay);
  }

  _closeModal() {
    this.overlay.classList.add("hidden");
    this.modal.style.display = "none";
    this.parent.removeChild(this.overlay);
  }

  _createModal() {
    this.modal = document.createElement("div");
    this.modal.classList.add("modal-window");

    const question = document.createElement("h1");
    question.textContent = this.questionHeading;
    question.classList.add("modal-heading");
    this.modal.appendChild(question);

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("btns-confirm");
    this.modal.appendChild(buttonGroup);

    this.yesBtn = document.createElement("button");
    this.yesBtn.classList.add("btn", "click-yes");
    this.yesBtn.type = "button";
    this.yesBtn.textContent = "Yes";
    this.yesBtn.dataset.heading = 'You just clicked "Yes"';
    buttonGroup.appendChild(this.yesBtn);

    this.cancelBtn = document.createElement("button");
    this.cancelBtn.classList.add("btn", "click-cancel");
    this.cancelBtn.type = "button";
    this.cancelBtn.textContent = "No";
    this.cancelBtn.dataset.heading = 'You just clicked "Cancel"';
    buttonGroup.appendChild(this.cancelBtn);
  }

  _appendModal() {
    this.parent.appendChild(this.modal);
  }

  _destroy() {
    this.parent.removeChild(this.modal);
    delete this;
  }

  printMsg(text) {
    confirmMsg.insertAdjacentHTML("beforeend", `<p> ${text} </p>`);
  }
}
