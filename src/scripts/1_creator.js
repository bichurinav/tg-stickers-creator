const $addTextButton = document.getElementById("add-text");
const $upObjectButton = document.getElementById("up-object");
const $downObjectButton = document.getElementById("down-object");
const buttonsSwapList = document.querySelectorAll(".button--swap");
creator.buttonsSwapList = buttonsSwapList;
const dropdowns = [];

creator.imageUpload("./dist/img/placeholder.png", () => {
  initFontTool();
  initColorTool();
  initFigureTool();
  creator.addText({
    top: 100,
    fontFamily: "Roboto",
  });
});

$addTextButton.addEventListener("click", () => {
  creator.addText();
});

$upObjectButton.addEventListener("click", () => {
  creator.bringForward(creator.currentSelectedObject);
  creator.renderAll();
});

$downObjectButton.addEventListener("click", () => {
  creator.sendToBack(creator.currentSelectedObject);
  creator.renderAll();
});
