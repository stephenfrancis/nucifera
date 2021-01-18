import React from "react";

interface Props {
  children: JSX.Element;
  hideCloseIcon?: boolean;
  modalStyle?: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Modal: React.FC<Props> = (props: Props) => {
  const close = () => {
    props.setOpen(false);
  };
  const renderCloseIcon = () => (
    <div className="modal_close_button" onClick={close}>
      ❌
    </div>
  );
  const style = Object.assign(
    {},
    {
      backgroundColor: "white",
      borderRadius: 10,
      height: "50vh",
      padding: 20,
      position: "relative",
      width: "50vw",
    },
    props.modalStyle
  );
  return props.open ? (
    <>
      <div className="modal_opacity_layer" />
      <div className="modal_position_layer">
        <div style={style}>
          {!props.hideCloseIcon && renderCloseIcon()}
          <div>{props.children}</div>
        </div>
      </div>
    </>
  ) : null;
};

export default Modal;
