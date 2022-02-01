import React from "react";

let closeCurrent: null | (() => void) = null;
let current_close_on_background_click: boolean = false;

window.addEventListener("keyup", (event: KeyboardEvent) => {
  if (event.key === "Escape" && closeCurrent) {
    closeCurrent();
    closeCurrent = null;
  }
});

window.addEventListener("click", (event: MouseEvent) => {
  if (closeCurrent && current_close_on_background_click) {
    closeCurrent();
    closeCurrent = null;
  }
});

const useModal: (
  close_on_background_click: boolean
) => [boolean, (open: boolean) => void] = (close_on_background_click) => {
  const [open, setOpenInner] = React.useState<boolean>(false);
  const setOpen = (open: boolean) => {
    if (closeCurrent) {
      closeCurrent();
    }
    if (open) {
      closeCurrent = setOpenInner.bind(undefined, false);
      current_close_on_background_click = close_on_background_click;
    } else {
      closeCurrent = null;
      current_close_on_background_click = false;
    }
    setOpenInner(open);
  };
  return [open, setOpen];
};

export default useModal;
