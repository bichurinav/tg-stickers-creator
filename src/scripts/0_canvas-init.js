const creator = new fabric.Canvas("canvas", {
  preserveObjectStacking: true,
});

const deleteIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

const cloneIcon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABYgAAAWIBXyfQUwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAO1SURBVHic7ZvLaxNBHMe/v0lb+0h6UEsfqCUiFCxaPIiIFz0oRbx7tXjQNFhQ+xDxUbWK1gqCpSiC9h/woKAo+Dr5uBTbUqFUmlCktIogNVZbs/PzIEmzNhXcndlJ6H4OYWc2v99898tkdmYzS9BE7Y2vYSFElIkaCQgDKNXV1hIkAIyB8Igl9cajwalsXyIdLYf7ZtoA6gJQpCP//0PfiWTLeKT8zqIzqpsK9327COCk6ryKaIk1h25kVig1IHwzsRuSn6jOq5AkM22NR4PvUhVCaXqJC8jdiweAAiI+l1mhTGy490ctRDKuKp9G5gPJ+YoPLatmAIU9gAK/NqnKpZkiGSiuSxWUGcBSrFSVSzcWYXXqWJ0BkGrHE40EkExrzRvRuvANMC3ANMvegIJ/naxsHdxGQjQKcBhkX8xI5pdT3Q19euXpJ6sBVR3v6onpFkA7AAYD+POxgCD6rl+efhYZUHVieCdJfgAgZECP59jGgJqOkXUk+R6WycUDfw+CbJ0HkDczOhWkDajoHAkysN+kGBOkDQjM8lYAxQa1GGFhTkyy2qQQU6QNkDJXnt95y7KfCfoGmBZgGt8A0wJM4xtgWoBpfANMCzCNb4BpAabxDTAtwDS+AaYFmMY3wLQA0/gGOA1kSbZYgpDu5XiDhYK0VscGEPEqe9n64kaUlwQEPqeOnfcAoMaetWgYi/5BzEnmCgtnR1MFN2PAxpVHxspThfFDJRMA3rpR5gmEx6MHK76lim4MWFFU+rPRnptOI7d7QRJEZzMrXN0FSHIkszzeHHwKwiU3ObVCOBo7HBzMrHJ3GyTsrGob2ptZFYuEToGoFcCcq9xqSTBzUywS6v37hPt5AOH22vYB24AYiwSvQRbUAdwDwjBgZDPFDBEGAHShkDbEo+X92b6U3ipb1TZ0gAh3nbTEwGurNLDnc2d9wplWcyiZCRKwvXDWelXZOhhWkc9LFO4UxSYhaKCmfahjzdFXJary6kbJTyAL0wDuM9EDwfKDJfFxuqchJzdV6TLAc4jQP3llc9P/xvmrQdMCTOMbsHDIebOez4ZkZ2uQBQOEyJv1/BJ8chKU8eaEyJf1fFYIGHYSlzZg8kr9BANv1EnylMSKeeuhk0DbIMiCTyEPewEzrsavb/nqJNZmwPTlhucEdKmR5Q0MPJsq++L4GcSi2+Bk9+YzYBwD8NOVMv0wEfqLS0P70Lkr6TTJkm+OVh9/X0sBKwpwIwPrAZQ5bUQhcwAmmfCCmW9Pdze4HrN+A5hc8Qv3J7e7AAAAAElFTkSuQmCC";

const deleteImg = document.createElement("img");
deleteImg.src = deleteIcon;

const cloneImg = document.createElement("img");
cloneImg.src = cloneIcon;

const controlDelete = {
  x: 0.5,
  y: -0.5,
  offsetY: -16,
  offsetX: 16,
  cursorStyle: "pointer",
  mouseUpHandler: deleteObject,
  render: renderIcon(deleteImg),
  cornerSize: 24,
};

const controlClone = {
  x: -0.5,
  y: -0.5,
  offsetY: -16,
  offsetX: -16,
  cursorStyle: "pointer",
  mouseUpHandler: cloneObject,
  render: renderIcon(cloneImg),
  cornerSize: 24,
};

function renderIcon(icon) {
  return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(icon, -size / 2, -size / 2, size, size);
    ctx.restore();
  };
}

function deleteObject(eventData, transform) {
  var target = transform.target;
  var canvas = target.canvas;
  canvas.remove(target);
  canvas.currentSelectedObject = null;
  canvas.requestRenderAll();
}

function cloneObject(eventData, transform) {
  var target = transform.target;
  var canvas = target.canvas;
  target.clone(function (cloned) {
    cloned.left += 10;
    cloned.top += 10;
    let clonedModified = cloned;

    if (target.$dropdown) {
      clonedModified = fabric.util.object.extend(clonedModified, {
        $dropdown: target.$dropdown,
      });
    }

    if (target.__proto__.type === "textbox") {
      clonedModified = fabric.util.object.extend(clonedModified, {
        isFontBold: target.isFontBold,
        isFontItalic: target.isFontItalic,
        isFontUnderline: target.isFontUnderline,
        isFontThrough: target.isFontThrough,
        sizeStroke: target.sizeStroke,
        choosenFont: target.choosenFont,
        strokeColor: target.strokeColor,
      });
    }

    if (target.__proto__.type !== "image") {
      clonedModified = fabric.util.object.extend(clonedModified, {
        color: target.color,
      });
    }
    canvas.add(clonedModified);
    canvas.updateEventListeners();
    canvas.setActiveObject(clonedModified);
  });
}

// Object

fabric.Textbox.prototype.controls.deleteControl = new fabric.Control(
  controlDelete
);
fabric.Object.prototype.controls.deleteControl = new fabric.Control(
  controlDelete
);

fabric.Object.prototype.controls.clone = new fabric.Control(controlClone);

fabric.Textbox.prototype.controls.clone = new fabric.Control(controlClone);

fabric.Object.prototype.checkInsideCanvas = function () {
  const isObjectNotInsideCanvas = () => {
    const objectCoords = this.getBoundingRect();

    if (objectCoords.left > creator.getWidth() - 5) {
      return true;
    }

    if (objectCoords.top > creator.getWidth() - 5) {
      return true;
    }

    if (objectCoords.width + objectCoords.left < 20) {
      return true;
    }

    if (objectCoords.height + objectCoords.top < 20) {
      return true;
    }

    return false;
  };

  this.on("modified", function () {
    if (isObjectNotInsideCanvas()) {
      creator.centerObject(this);
    }
  });

  this.on("scaling", function () {
    if (isObjectNotInsideCanvas()) {
      creator.centerObject(this);
    }
  });
};

fabric.Object.prototype.toggleActiveButton = function (
  $button,
  callback = null
) {
  if ($button.classList.contains("button--active")) {
    $button.classList.remove("button--active");
    if (callback) callback(false);
  } else {
    $button.classList.add("button--active");
    if (callback) callback(true);
  }
};

// Canvas

fabric.Canvas.prototype.currentSelectedObject = null;

function getStateObject(currentSelectedObject) {
  if (currentSelectedObject.isFontBold) {
    creator.$fontBoldToolButton.classList.add("button--active");
  }

  if (currentSelectedObject.isFontItalic) {
    creator.$fontItalicToolButton.classList.add("button--active");
  }

  if (currentSelectedObject.isFontUnderline) {
    creator.$fontUnderlineToolButton.classList.add("button--active");
  }

  if (currentSelectedObject.isFontThrough) {
    creator.$fontThroughToolButton.classList.add("button--active");
  }

  if (
    currentSelectedObject.$dropdown &&
    currentSelectedObject.$dropdown.state
  ) {
    creator.currentSelectedObject.$dropdown.el.parentNode.classList.add(
      "button--active"
    );
    creator.currentSelectedObject.$dropdown.el.classList.add(
      "dropdown--active"
    );
    // SET COLOR
    if (
      creator.currentSelectedObject.$dropdown.el.querySelector("#color-input")
    ) {
      const color = currentSelectedObject.color || "#FFF";
      creator.$colorpicker.setColor(color);
    }
  }

  if (currentSelectedObject.choosenFont) {
    creator.$selectFont.el.value = currentSelectedObject.choosenFont;
    creator.$selectFont.update();
  }

  if (creator.$selectWidthStroke) {
    creator.$selectWidthStroke.el.value =
      currentSelectedObject.sizeStroke ?? "0";
    creator.$selectWidthStroke.update();
  }

  if (currentSelectedObject.strokeColor) {
    const color = currentSelectedObject.strokeColor || "#000";
    creator.$colorStrokePicker.setColor(color);
  }
}

function enableButtonsList(list) {
  if (list) {
    list.forEach((item) => {
      item.classList.add("enable");
    });
  }
}

function offButtonsList(list) {
  if (list) {
    list.forEach((item) => {
      item.classList.remove("enable");
      if (item.children[2]) {
        item.children[2].classList.remove("dropdown--active");
        item.classList.remove("button--active");
      }
    });
  }
}

fabric.Canvas.prototype.updateEventListeners = function () {
  this._objects.forEach((object) => {
    object.off("selected");
    object.off("deselected");
    object.on("selected", () => {
      this.currentSelectedObject = object;
      this.currentTypeSelected = object.__proto__.type;

      if (this.currentTypeSelected === "textbox") {
        enableButtonsList(this.buttonsTextList);
      }

      if (this.currentTypeSelected !== "image") {
        creator.$colorpicker.setColor(
          this.currentSelectedObject.color || "#FFF"
        );
        enableButtonsList(this.buttonsFigureList);
      }

      enableButtonsList(this.buttonsSwapList);

      getStateObject(this.currentSelectedObject);
      object.checkInsideCanvas();
    });
    object.on("deselected", () => {
      if (this.currentTypeSelected === "textbox") {
        this.$fontBoldToolButton.classList.remove("button--active");
        this.$fontItalicToolButton.classList.remove("button--active");
        this.$fontUnderlineToolButton.classList.remove("button--active");
        this.$fontThroughToolButton.classList.remove("button--active");
      }
      offButtonsList(this.buttonsTextList);
      offButtonsList(this.buttonsFigureList);
      offButtonsList(this.buttonsSwapList);
      this.currentSelectedObject = null;
      this.currentTypeSelected = null;
    });
  });
};

fabric.Canvas.prototype.setAllTextsToFront = function () {
  this._objects.forEach((object) => {
    if (object.__proto__.type === "textbox") {
      this.bringForward(object, true);
    }
  });
};

fabric.Canvas.prototype.imageUpload = function (imageUrl, callback = null) {
  fabric.Image.fromURL(imageUrl, (imgObject) => {
    imgObject.scale(0.5);
    this.add(imgObject);
    this.setAllTextsToFront();
    this.updateEventListeners();
    this.setActiveObject(imgObject);
    this.centerObject(imgObject);

    if (callback) {
      callback();
    }
  });
};

fabric.Canvas.prototype.loadFont = function (fontName) {
  const myfont = new FontFaceObserver(fontName);
  myfont
    .load()
    .then(() => {
      this.currentSelectedObject.set({
        fontFamily: myfont.family,
        fontSize: 40,
      });
      this.renderAll();
    })
    .catch(function (e) {
      console.log(e);
    });
};

// TODO: сделать общую функцию создания (Class)

fabric.Canvas.prototype.addText = function (options = null) {
  const textObject = new fabric.Textbox("Текст...", {
    fill: "#FFF",
    fontSize: 39,
    editable: true,
    breakWords: true,
    editable: true,
    breakWords: true,
    strokeWidth: 0,
    stroke: "#000",
  });

  this.add(textObject);
  this.bringForward(textObject, true);
  this.updateEventListeners();
  this.setActiveObject(textObject);
  this.centerObject(textObject);
  this.$colorpicker.setColor("#FFF");
  this.$colorStrokePicker.setColor("#000");
  this.loadFont(this.choosenFont || "Roboto");
  this.requestRenderAll();

  if (options) {
    textObject.set(options);
    this.renderAll();
  }
};

fabric.Canvas.prototype.addRect = function (options = null) {
  const rectObject = new fabric.Rect({
    fill: "#FFF",
    width: 150,
    height: 150,
    left: 30,
    top: 30,
  });

  this.add(rectObject);
  this.setAllTextsToFront();
  this.sendToBack(rectObject);
  this.updateEventListeners();
  this.setActiveObject(rectObject);
  this.$colorpicker.setColor("#FFF");
  this.requestRenderAll();

  if (options) {
    rectObject.set(options);
    this.renderAll();
  }
};

fabric.Canvas.prototype.addCircle = function (options = null) {
  const circleObject = new fabric.Circle({
    radius: 65,
    fill: "#FFF",
    width: 150,
    height: 150,
    left: 30,
    top: 30,
  });

  this.add(circleObject);
  this.setAllTextsToFront();
  this.sendToBack(circleObject);
  this.updateEventListeners();
  this.setActiveObject(circleObject);
  this.$colorpicker.setColor("#FFF");
  this.requestRenderAll();

  if (options) {
    circleObject.set(options);
    this.renderAll();
  }
};
