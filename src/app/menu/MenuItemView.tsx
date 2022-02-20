import * as React from "react";
import { Link } from "react-router-dom";

import MenuItem from "./MenuItem";
import View from "../../data/View";

interface Props {
  view: View;
}

const MenuItemView: React.FC<Props> = (props) => {
  return (
    <MenuItem iconPath="/assets/view.svg" label={props.view.id}>
      <table>
        <tbody>
          <tr>
            <td>View Id:</td>
            <td>
              <b>{props.view.id}</b>
            </td>
          </tr>
          <tr>
            <td>Type:</td>
            <td>
              <b>{props.view.getType()}</b>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <b>
          <u>
            <Link to={`../edit/${props.view.id}`}>Edit this View</Link>
          </u>
        </b>
      </p>
    </MenuItem>
  );
};

export default MenuItemView;
