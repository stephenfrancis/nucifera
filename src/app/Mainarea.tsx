import * as React from "react";

interface Props {}

const Body: React.FC<Props> = (props) => {
  return <div className="mainarea">{props.children}</div>;
};

export default Body;
