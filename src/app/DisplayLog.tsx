import * as React from "react";

import { LogMessage, registerNewMessageCallback } from "./Logger";

interface Props {}

const Main: React.FC<Props> = (props) => {
  const [msg, setMsg] = React.useState<LogMessage | null>(null);
  React.useEffect(() => {
    registerNewMessageCallback(setMsg);
  }, []);
  const className = `log_${msg?.level}`;
  return (
    <div className="log">
      {!!msg && <div className={className}>{String(msg.message)}</div>}
    </div>
  );
};

export default Main;
