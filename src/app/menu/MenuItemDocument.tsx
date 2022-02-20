import * as React from "react";

import Document from "../../data/Document";
import MenuItem from "./MenuItem";

interface Props {
  doc: Document;
}

const MenuItemDocument: React.FC<Props> = (props) => {
  return (
    <MenuItem iconPath="/assets/document.svg" label={props.doc.getId()}>
      <table>
        <tbody>
          <tr>
            <td>_id</td>
            <td>
              <b>{props.doc.getData()._id}</b>
            </td>
          </tr>
          <tr>
            <td>_rev</td>
            <td>
              <b>{props.doc.getData()._rev}</b>
            </td>
          </tr>
          <tr>
            <td>template</td>
            <td>
              <b>{props.doc.getData().template}</b>
            </td>
          </tr>
          <tr>
            <td>conflicts</td>
            <td>
              <b>{props.doc.getData()._conflicts}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </MenuItem>
  );
};

export default MenuItemDocument;
