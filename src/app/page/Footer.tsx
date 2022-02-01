import * as React from "react";

import DisplayLog from "./DisplayLog";

interface Props {}

const Footer: React.FC<Props> = (props) => {
  return (
    <div className="footer">
      <DisplayLog />
      {props.children}
    </div>
  );
};

export default Footer;
