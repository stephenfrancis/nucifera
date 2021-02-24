import * as React from "react";

interface Props {
  className?: string;
}

const Body: React.FC<Props> = (props) => {
  return (
    <div className={`mainarea ${props.className || ""}`}>{props.children}</div>
  );
};

export default Body;
