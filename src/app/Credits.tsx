import * as React from "react";

interface Props {}

const Credits: React.FC<Props> = (props) => {
  return (
    <div>
      <h3>Credits</h3>
      <ul>
        <li>
          Icons from{" "}
          <u>
            <a href="https://www.flaticon.com">www.flaticon.com</a>
          </u>
        </li>
      </ul>
    </div>
  );
};

export default Credits;
