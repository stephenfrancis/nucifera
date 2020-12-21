import * as React from "react";

interface Props {}

const Header: React.FC<Props> = (props) => {
  return (
    <div className="header">
      {props.children}
      <div className="logo">
        <b>nu</b>cifera
      </div>
    </div>
  );
};

export default Header;