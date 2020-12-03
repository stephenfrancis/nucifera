import * as React from "react";

import { getAll, LogMessage, registerNewMessageCallback } from "../data/Logger";
import Modal from "./Modal";
import useModal from "./useModal";

interface Props {}

const renderMessage = (msg: LogMessage) => {
  const className = `log_${msg?.level}`;
  return (
    <div className={className} key={String(msg.raised_at.valueOf())}>
      {`${msg.raised_at.toLocaleTimeString()}.${msg.raised_at.getMilliseconds()}: ${
        msg.text
      }`}
    </div>
  );
};

const Main: React.FC<Props> = (props) => {
  const [msg, setMsg] = React.useState<LogMessage | null>(null);
  const [modal, setModal] = useModal();
  React.useEffect(() => {
    registerNewMessageCallback(setMsg);
  }, []);
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <>
      <div className="log" onClick={toggleModal}>
        {!!msg && renderMessage(msg)}
      </div>
      <Modal
        open={modal}
        setOpen={setModal}
        closeOnBackgroundClick
        modalStyle={{
          borderRadius: 0,
          padding: 8,
          height: "auto",
          width: "auto",
          position: "fixed",
          bottom: 41,
          left: 41,
          right: 0,
        }}
      >
        <div>
          {getAll()
            // .reverse()
            // .filter((value, index) => index !== 0)
            .map((next_msg: LogMessage) => renderMessage(next_msg))}
        </div>
      </Modal>
    </>
  );
};

export default Main;
