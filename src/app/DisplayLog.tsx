import * as React from "react";

import {
  getAll,
  LogMessage,
  registerNewMessageCallback,
  unRegisterNewMessageCallback,
} from "../data/Logger";
import Modal from "./Modal";
import useModal from "./useModal";

interface Props {}

const renderMessage = (msg: LogMessage) => {
  const className = `log_${msg?.level}`;
  let time_str: string = String(msg.raised_at.getMilliseconds());
  time_str = "0".repeat(3 - time_str.length) + time_str;
  return (
    <div className={className} key={String(msg.raised_at.valueOf())}>
      {`${msg.raised_at.toLocaleTimeString()}.${time_str}: ${msg.text}`}
    </div>
  );
};

const DisplayLog: React.FC<Props> = (props) => {
  const [msg, setMsg] = React.useState<LogMessage | null>(null);
  const [modal, setModal] = useModal();
  React.useEffect(() => {
    registerNewMessageCallback(setMsg);
    return () => {
      unRegisterNewMessageCallback(setMsg);
    };
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
          border: "1px solid black",
          borderRadius: 0,
          padding: 8,
          height: "auto",
          width: "auto",
          position: "fixed",
          bottom: 40,
          left: 40,
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

export default DisplayLog;
