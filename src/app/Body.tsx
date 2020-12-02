import * as React from "react";

interface Props {}

const Main: React.FC<Props> = (props) => {
  return (
    <div className="body">
      <div className="gutter"></div>
      {props.children}
    </div>
  );
};

export default Main;
