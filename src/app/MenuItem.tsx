import * as React from "react";

import useModal from "./useModal";

interface Props {
  iconPath?: string;
  label: string;
}

const MenuItem: React.FC<Props> = (props) => {
  const [modal, setModal] = useModal(true);
  const toggleModal = (event: React.MouseEvent) => {
    setModal(!modal);
    event.stopPropagation();
    return false;
  };

  const class_name = "menu_item" + (modal ? " open" : "");
  return (
    <div className={class_name} onClick={toggleModal}>
      <div>
        {props.iconPath && <img src={props.iconPath} />}
        <span>{props.label}</span>
      </div>
      {modal && <div>{props.children}</div>}
    </div>
  );
};

export default MenuItem;
