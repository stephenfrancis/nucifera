import * as React from "react";
import { BrowserRouter, Link, Redirect } from "react-router-dom";

import Document from "../data/Document";

interface Props {
  doc: Document;
}

const BurgerMenuDocument: React.FC<Props> = (props) => {
  return (
    <>
      <h2>Document</h2>
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
        </tbody>
      </table>
    </>
  );
};

export default BurgerMenuDocument;
