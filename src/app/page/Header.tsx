import * as React from "react";

interface Props {}

const Header: React.FC<Props> = (props) => {
  return (
    <header>
      {props.children}
      <a className="logo" href="/">
        <img src="/lotus_icon.svg" />
        <b>nu</b>cifera
      </a>
    </header>
  );
};

export default Header;
