import * as React from "react";

import DisplayLog from "./DisplayLog";

interface Props {}

const Footer: React.FC<Props> = (props) => {
  return (
    <div className="footer">
      <DisplayLog />
    </div>
  );
};

export default Footer;
