import React from "react";

interface Props {
  children: JSX.Element;
  closeOnBackgroundClick?: boolean;
  hideCloseIcon?: boolean;
  modalStyle?: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Modal: React.FC<Props> = (props: Props) => {
  const close = () => {
    props.setOpen(false);
  };
  const backgroundRef = React.useRef<HTMLDivElement>(null);
  const clickOnBackground = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      event.target === backgroundRef.current &&
      props.closeOnBackgroundClick
    ) {
      close();
    }
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
      <div
        onClick={clickOnBackground}
        ref={backgroundRef}
        className="modal_position_layer"
      >
        <div style={style}>
          {!props.hideCloseIcon && renderCloseIcon()}
          <div>{props.children}</div>
        </div>
      </div>
    </>
  ) : null;
};

export default Modal;
