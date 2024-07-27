const ModalController = {
  bindEvents: () => {
    const errorModalCloseBtn = document.getElementById("close-error-modal");
    errorModalCloseBtn.addEventListener("click", () => {
      const errorModal = document.getElementById("error-dialog");
      errorModal.close();
    });
  },

  showErrors: (errors) => {
    const errorModal = document.getElementById("error-dialog");
    const listElement = errorModal.querySelector("ul");
    listElement.innerHTML = "";

    let errorMessages = [];

    if (errors.invalidIndexes.length > 0) {
      errorMessages.push("You have some ship parts placed incorrectly!");
    }

    if (errors.adjacentShips.length > 0) {
      errorMessages.push("You have your ships too close together!");
    }

    if (!errors.rightAmountOfShips) {
      errorMessages.push("You have incorrect amount of ships on board!");
    }

    errorMessages.forEach((msg) => {
      const li = document.createElement("li");
      li.textContent = "-> " + msg;
      listElement.appendChild(li);
    });

    return errorMessages.length > 0
      ? (() => {
          errorModal.showModal();
          return true;
        })()
      : false;
  },
};

export default ModalController;
