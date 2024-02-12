function toggleDropdown($dropdown) {
  closeAllDropdowns($dropdown);

  $dropdown.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  if ($dropdown.parentNode.classList.contains("button--active")) {
    $dropdown.classList.add("dropdown--active");
  } else {
    $dropdown.classList.remove("dropdown--active");
    // SET COLOR
    if ($dropdown.querySelector("#color-input")) {
      const color = creator.currentSelectedObject.color || "#FFF";
      creator.$colorpicker.setColor(color);
    }
  }
}

function closeAllDropdowns(currentDropdown) {
  dropdowns.forEach((dropdown) => {
    if (dropdown.offsetParent.id === currentDropdown.offsetParent.id) return;
    if (dropdown.classList.contains("dropdown--active")) {
      dropdown.classList.remove("dropdown--active");
      dropdown.parentNode.classList.remove("button--active");
    }
  });
}
