import * as React from "react";

import Modal from "./Modal";
import useModal from "./useModal";

interface Props {
  content: () => JSX.Element;
}

const Main: React.FC<Props> = (props) => {
  const [modal, setModal] = useModal();
  const toggleModal = () => {
    console.log(`burger icon clicked`);
    setModal(!modal);
  };

  return (
    <>
      <div className="burger_icon" onClick={toggleModal}>
        ☰
      </div>
      <Modal
        open={modal}
        setOpen={setModal}
        closeOnBackgroundClick
        modalStyle={{
          border: "1px solid black",
          borderRadius: 0,
          padding: 8,
          height: "auto",
          width: "auto",
          position: "fixed",
          top: 40,
          left: 0,
        }}
      >
        <div>
          <h1>Nucifera</h1>
          {props.content()}
        </div>
      </Modal>
    </>
  );
};

export default Main;
