function initColorTool() {
  const $colorToolButton = document.getElementById("color-tool");
  const $dropdown = $colorToolButton.querySelector(".dropdown");
  dropdowns.push($dropdown);

  const huebText = new Huebee("#color-input", {
    saturations: 2,
    staticOpen: true,
    hues: 8,
  });

  const huebStroke = new Huebee("#color-stroke-input", {
    saturations: 2,
    staticOpen: true,
    hues: 8,
  });

  creator.$colorpicker = huebText;
  creator.$colorStrokePicker = huebStroke;
  creator.$colorToolButton = $colorToolButton;
  creator.$colorStrokePicker.setColor("#000");

  // TEXT CHANGE
  creator.$colorpicker.on("change", (color) => {
    if (creator.currentTypeSelected !== "image") {
      creator.currentSelectedObject.color = color;
      creator.currentSelectedObject.set({
        fill: color,
      });
      creator.renderAll();
    }
  });

  // STROKE CHANGE
  creator.$colorStrokePicker.on("change", (color) => {
    if (creator.currentTypeSelected === "textbox") {
      creator.currentSelectedObject.strokeColor = color;
      creator.currentSelectedObject.set({
        stroke: color,
      });
      creator.renderAll();
    }
  });

  $colorToolButton.addEventListener("click", () => {
    if (creator.currentTypeSelected !== "image") {
      creator.currentSelectedObject.toggleActiveButton(
        $colorToolButton,
        (state) => {
          creator.currentSelectedObject.$dropdown = { state, el: $dropdown };
          toggleDropdown($dropdown);
        }
      );
    }
  });
}
