import * as React from "react";
import { BrowserRouter, Link, Redirect } from "react-router-dom";

import View from "../data/View";

interface Props {
  view: View;
}

const BurgerMenuView: React.FC<Props> = (props) => {
  return (
    <>
      <h2>View</h2>
      <table>
        <tbody>
          <tr>
            <td>id</td>
            <td>
              <b>{props.view.id}</b>
            </td>
          </tr>
          <tr>
            <td>type</td>
            <td>
              <b>{props.view.getType()}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default BurgerMenuView;
