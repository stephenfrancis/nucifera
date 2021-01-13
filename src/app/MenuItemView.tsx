import * as React from "react";

import MenuItem from "./MenuItem";
import View from "../data/View";

interface Props {
  view: View;
}

const MenuItemView: React.FC<Props> = (props) => {
  return (
    <MenuItem iconPath="/view.svg" label={props.view.id}>
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
    </MenuItem>
  );
};

export default MenuItemView;
