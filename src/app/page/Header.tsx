import * as React from "react";

interface Props {}

const Header: React.FC<Props> = (props) => {
  return (
    <div className="header">
      {props.children}
      <a className="logo" href="/">
        <img src="/lotus_icon.svg" />
        <b>nu</b>cifera
      </a>
    </div>
  );
};

export default Header;
