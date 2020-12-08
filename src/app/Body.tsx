import * as React from "react";

import BurgerMenu from "./BurgerMenu";

interface Props {
  burgerMenuContent: () => JSX.Element;
}

const Body: React.FC<Props> = (props) => {
  return (
    <div className="body">
      <div className="gutter">
        <BurgerMenu content={props.burgerMenuContent} />
      </div>
      <div className="mainarea">{props.children}</div>
    </div>
  );
};

export default Body;
