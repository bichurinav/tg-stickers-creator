function initFigureTool() {
  const buttonsFigureList = document.querySelectorAll(".button--figure");
  const $buttonAddRect = document.getElementById("add-rect");
  const $buttonAddCircle = document.getElementById("add-circle");

  creator.buttonsFigureList = buttonsFigureList;
  creator.$buttonAddRect = $buttonAddRect;
  creator.$buttonAddCircle = $buttonAddCircle;

  creator.$buttonAddRect.addEventListener("click", () => {
    creator.addRect();
  });

  creator.$buttonAddCircle.addEventListener("click", () => {
    creator.addCircle();
  });
}
