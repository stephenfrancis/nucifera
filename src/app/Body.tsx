import * as React from "react";

import BurgerMenu from "./BurgerMenu";

interface Props {}

const Main: React.FC<Props> = (props) => {
  return (
    <div className="body">
      <div className="gutter">
        <BurgerMenu />
      </div>
      {props.children}
    </div>
  );
};

export default Main;
