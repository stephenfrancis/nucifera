import * as React from "react";

import DisplayLog from "./DisplayLog";

interface Props {}

const Footer: React.FC<Props> = (props) => {
  return (
    <footer>
      <DisplayLog />
      {props.children}
    </footer>
  );
};

export default Footer;
