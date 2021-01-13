import * as React from "react";

import Header from "./Header";
import Mainarea from "./Mainarea";
import Footer from "./Footer";

interface Props {}

const Loading: React.FC<Props> = (props) => {
  return (
    <>
      <Header />
      <Mainarea />
      <Footer />
    </>
  );
};

export default Loading;
