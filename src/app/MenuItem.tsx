import * as React from "react";

import useModal from "./useModal";

interface Props {
  iconPath?: string;
  label: string;
}

const MenuItem: React.FC<Props> = (props) => {
  const [modal, setModal] = useModal();
  const toggleModal = () => {
    console.log(`menu item clicked`);
    setModal(!modal);
  };
  const backgroundRef = React.useRef<HTMLDivElement>(null);
  const clickOnBackground = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === backgroundRef.current) {
      setModal(false);
    }
  };

  const class_name = "menu_item" + (modal ? " open" : "");
  return (
    <>
      {modal && (
        <div
          onClick={clickOnBackground}
          ref={backgroundRef}
          className="modal_position_layer"
        ></div>
      )}
      <div className={class_name} onClick={toggleModal}>
        <div>
          {props.iconPath && <img src={props.iconPath} />}
          <span>{props.label}</span>
        </div>
        {modal && <div>{props.children}</div>}
      </div>
    </>
  );
};

export default MenuItem;
