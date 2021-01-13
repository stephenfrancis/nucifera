import * as React from "react";

import Credits from "./Credits";
import Database from "../data/Database";
import MenuItem from "./MenuItem";

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

const MenuItemDatabase: React.FC<Props> = (props) => {
  const [info, setInfo] = React.useState<PouchDB.Core.DatabaseInfo>(null);

  React.useEffect(() => {
    props.db.getInfo().then((result) => {
      setInfo(result);
    });
  }, [props.db.name]);

  return (
    <MenuItem iconPath="/database.svg" label={props.db.name}>
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
      <Credits />
    </MenuItem>
  );
};

export default MenuItemDatabase;
