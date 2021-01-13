import * as React from "react";

interface Props {}

const Credits: React.FC<Props> = (props) => {
  return (
    <div>
      <p>Nucifera uses the following 3rd-party assets:</p>
      <ul>
        <li>Icons from https://www.flaticon.com</li>
      </ul>
    </div>
  );
};

export default Credits;
