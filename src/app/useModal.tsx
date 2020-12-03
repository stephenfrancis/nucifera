import React from "react";

let closeCurrent: null | (() => void) = null;

window.addEventListener("keyup", (event: KeyboardEvent) => {
  // console.log(`keyup event listener: ${event.key}`)
  if (event.key === "Escape" && closeCurrent) {
    closeCurrent();
    closeCurrent = null;
  }
});

const Default: () => [boolean, (open: boolean) => void] = () => {
  const [open, setOpenInner] = React.useState<boolean>(false);
  const setOpen = (open: boolean) => {
    if (closeCurrent) {
      closeCurrent();
    }
    if (open) {
      closeCurrent = setOpenInner.bind(undefined, false);
    } else {
      closeCurrent = null;
    }
    setOpenInner(open);
  };
  return [open, setOpen];
};

export default Default;
