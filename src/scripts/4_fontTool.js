function initFontTool() {
  const buttonsTextList = document.querySelectorAll(".button--font");
  const $fontToolButton = document.getElementById("font-tool");
  const $fontBoldToolButton = document.getElementById("font-bold-tool");
  const $fontItalicToolButton = document.getElementById("font-italic-tool");
  const $fontUnderlineToolButton = document.getElementById(
    "font-underline-tool"
  );
  const $fontThroughToolButton = document.getElementById("font-through-tool");
  const $dropdown = $fontToolButton.querySelector(".dropdown");
  dropdowns.push($dropdown);
  const $selectFont = NiceSelect.bind(document.getElementById("font-select"));
  const $selectWidthStroke = NiceSelect.bind(
    document.getElementById("width-stroke-select")
  );

  creator.$selectFont = $selectFont;
  creator.$selectWidthStroke = $selectWidthStroke;
  creator.$fontBoldToolButton = $fontBoldToolButton;
  creator.$fontItalicToolButton = $fontItalicToolButton;
  creator.$fontUnderlineToolButton = $fontUnderlineToolButton;
  creator.$fontThroughToolButton = $fontThroughToolButton;
  creator.buttonsTextList = buttonsTextList;

  creator.$selectFont.el.value = "Roboto";
  creator.$selectWidthStroke.el.value = "0";
  creator.$selectFont.update();
  creator.$selectWidthStroke.update();

  creator.$selectFont.el.addEventListener("change", (event) => {
    if (creator.currentTypeSelected === "textbox") {
      const fontFamily = event.target.value;
      creator.choosenFont = fontFamily;
      creator.currentSelectedObject.choosenFont = fontFamily;
      creator.loadFont(fontFamily)
    }
  });

  creator.$selectWidthStroke.el.addEventListener("change", (event) => {
    if (creator.currentTypeSelected === "textbox") {
      const sizeStroke = event.target.value;
      creator.currentSelectedObject.sizeStroke = sizeStroke;
      creator.currentSelectedObject.set({
        strokeWidth: Number(sizeStroke),
      })
      creator.renderAll();
    }
  })

  creator.$fontBoldToolButton.addEventListener("click", (event) => {
    if (creator.currentTypeSelected === "textbox") {
      creator.currentSelectedObject.toggleActiveButton(
        creator.$fontBoldToolButton,
        (state) => {
          creator.currentSelectedObject.isFontBold = state;
          creator.currentSelectedObject.set({
            fontWeight: state ? "bold" : "normal",
          });
          creator.renderAll();
        }
      );
    }
  });

  creator.$fontItalicToolButton.addEventListener("click", (event) => {
    if (creator.currentTypeSelected === "textbox") {
      creator.currentSelectedObject.toggleActiveButton(
        creator.$fontItalicToolButton,
        (state) => {
          creator.currentSelectedObject.isFontItalic = state;
          creator.currentSelectedObject.set({
            fontStyle: state ? "italic" : "normal",
          });
          creator.renderAll();
        }
      );
    }
  });

  creator.$fontUnderlineToolButton.addEventListener("click", (event) => {
    if (creator.currentTypeSelected === "textbox") {
      creator.currentSelectedObject.toggleActiveButton(
        creator.$fontUnderlineToolButton,
        (state) => {
          creator.currentSelectedObject.isFontUnderline = state;
          creator.currentSelectedObject.set({
            underline: state,
          });
          creator.renderAll();
        }
      );
    }
  });

  creator.$fontThroughToolButton.addEventListener("click", (event) => {
    if (creator.currentTypeSelected === "textbox") {
      creator.currentSelectedObject.toggleActiveButton(
        creator.$fontThroughToolButton,
        (state) => {
          creator.currentSelectedObject.isFontThrough = state;
          creator.currentSelectedObject.set({
            linethrough: state,
          });
          creator.renderAll();
        }
      );
    }
  });

  $fontToolButton.addEventListener("click", () => {
    if (creator.currentTypeSelected === "textbox") {
      creator.currentSelectedObject.toggleActiveButton(
        $fontToolButton,
        (state) => {
          creator.currentSelectedObject.$dropdown = { state, el: $dropdown };
          toggleDropdown($dropdown);
        }
      );
    }
  });
}
