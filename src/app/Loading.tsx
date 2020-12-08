import * as React from "react";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

interface Props {}

const Loading: React.FC<Props> = (props) => {
  return (
    <>
      <Header />
      <Body burgerMenuContent={() => <></>} />
      <Footer />
    </>
  );
};

export default Loading;
