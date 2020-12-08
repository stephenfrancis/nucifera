import * as React from "react";
import { BrowserRouter, Link, Redirect } from "react-router-dom";

import Database from "../data/Database";

interface Props {
  db: Database;
}

const renderPouchDBInfo = (info: PouchDB.Core.DatabaseInfo) => {
  return (
    <>
      <tr>
        <td>Number of Documents</td>
        <td>
          <b>{info.doc_count}</b>
        </td>
      </tr>
      <tr>
        <td>Update Sequence</td>
        <td>
          <b>{info.update_seq}</b>
        </td>
      </tr>
    </>
  );
};

const BurgerMenuDatabase: React.FC<Props> = (props) => {
  const [info, setInfo] = React.useState<PouchDB.Core.DatabaseInfo>(null);
  React.useEffect(() => {
    props.db.getInfo().then((result) => {
      setInfo(result);
    });
  }, [props.db.name]);
  return (
    <>
      <h2>Database</h2>
      <table>
        <tbody>
          <tr>
            <td>name</td>
            <td>
              <b>{props.db.name}</b>
            </td>
          </tr>
          {info && renderPouchDBInfo(info)}
        </tbody>
      </table>
    </>
  );
};

export default BurgerMenuDatabase;
