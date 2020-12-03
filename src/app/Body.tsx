import * as React from "react";

import BurgerMenu from "./BurgerMenu";

interface Props {}

const Main: React.FC<Props> = (props) => {
  return (
    <div className="body">
      <div className="gutter">
        <BurgerMenu />
      </div>
      <div className="mainarea">{props.children}</div>
    </div>
  );
};

export default Main;
