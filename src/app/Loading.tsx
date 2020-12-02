import * as React from "react";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

interface Props {}

const Main: React.FC<Props> = (props) => {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
};

export default Main;
