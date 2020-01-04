var text = document.querySelector("#animated-text"),
  moveText = function () {
    if (!text.classList.contains("off-rainbow")) {
      text.classList.add("off-rainbow");
    }
  };

document.body.addEventListener("click", moveText);