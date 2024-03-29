import * as React from "react";

import {
  // getAll,
  getLatest,
  LogMessage,
  registerNewMessageCallback,
  unRegisterNewMessageCallback,
} from "../../data/Logger";
// import Modal from "./Modal";
// import useModal from "./useModal";

interface Props {}

const renderMessage = (msg: LogMessage) => {
  const className = `log_${msg?.level}`;
  // let time_str: string = String(msg.raised_at.getMilliseconds());
  // time_str = "0".repeat(3 - time_str.length) + time_str;
  return (
    <div className={className} /*key={String(msg.seq)}*/>
      {/* {`${msg.raised_at.toLocaleTimeString()}.${time_str}: ${msg.text}`} */}
      {msg.text}
    </div>
  );
};

const DisplayLog: React.FC<Props> = (props) => {
  const [msg, setMsg] = React.useState<LogMessage | null>(null);
  // const [emphasis, setEmphasis] = React.useState<boolean>(false);
  // const [modal, setModal] = useModal(true);

  // const clearEmphasis = () => {
  //   setEmphasis(false);
  // };

  React.useEffect(() => {
    registerNewMessageCallback(setMsg);
    const msg = getLatest();
    if (msg) setMsg(msg);
    return () => {
      unRegisterNewMessageCallback(setMsg);
    };
  }, []);

  // React.useEffect(() => {
  //   setEmphasis(true);
  //   const timeout = setTimeout(clearEmphasis, 500);
  //   return () => {
  //     console.log(`clearing timeout`);
  //     clearTimeout(timeout);
  //   };
  // }, [msg]);
  // const toggleModal = (event: React.MouseEvent) => {
  //   setModal(!modal);
  //   event.stopPropagation();
  // };
  return (
    <>
      <div
        className="log"
        // emphasis ? "log_emphasis" : ""
        // }`} /* onClick={toggleModal} */
      >
        {!!msg && renderMessage(msg)}
      </div>
      {/* <Modal
        open={modal}
        setOpen={setModal}
        modalStyle={{
          border: "1px solid black",
          borderRadius: 0,
          padding: 8,
          height: "auto",
          width: "auto",
          position: "fixed",
          bottom: 40,
          left: 0,
          right: 0,
        }}
      >
        <div>
          {getAll()
            // .reverse()
            // .filter((value, index) => index !== 0)
            .map((next_msg: LogMessage) => renderMessage(next_msg))}
        </div>
      </Modal> */}
    </>
  );
};

export default DisplayLog;
