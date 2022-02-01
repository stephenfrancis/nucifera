import * as React from "react";

import Mainarea from "./Mainarea";
import { error, info } from "../../data/Logger";
import Footer from "./Footer";
import Header from "./Header";

interface Props {}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(errorText, errorInfo) {
    error(errorText);
    error(JSON.stringify(errorInfo));
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Header />
          <Mainarea>
            <h1>Something went wrong.</h1>;
          </Mainarea>
          <Footer />
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
