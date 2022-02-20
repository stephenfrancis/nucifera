import * as React from "react";
import { Link } from "react-router-dom";

import Credits from "./Credits";
import Database from "../../data/Database";
import Document from "../../data/Document";
import { error, info } from "../../data/Logger";
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
  const [nuDbInfo, setNuDbInfo] = React.useState<Document>(null);

  const makeLink = (type: string, id: string, label?: string) =>
    id ? (
      <u>
        <b>
          <Link to={`/${props.db.name}/${type}/${id}`}>{label || id}</Link>
        </b>
      </u>
    ) : null;

  const renderNuDbInfo = (nuDbInfo?: Document) => {
    const views = nuDbInfo?.getData()?.views || ["docs"];
    const templates = nuDbInfo?.getData()?.templates || ["main"];
    const children: JSX.Element[] = [];
    for (let i = 0; i < Math.max(views.length, templates.length); i += 1) {
      children.push(
        <tr key={String(i)}>
          <td>{makeLink("create", templates[i])}</td>
          <td>{makeLink("view", views[i])}</td>
        </tr>
      );
    }
    return <>{children}</>;
  };

  React.useEffect(() => {
    props.db
      .getInfo()
      .then((result) => {
        setInfo(result);
      })
      .catch((err) => error(err));
    props.db
      .getInfoDoc()
      .then((result) => {
        setNuDbInfo(result);
      })
      .catch((err) => error(err));
  }, [props.db.name]);

  return (
    <MenuItem iconPath="/assets/database.svg" label={props.db.name}>
      <table>
        <tbody>
          <tr>
            <td style={{ width: 180 }}>Database Name</td>
            <td style={{ width: 180 }}>
              <b>{props.db.name}</b>
            </td>
          </tr>
          {info && renderPouchDBInfo(info)}
          <tr className="separator">
            <td colSpan={2} />
          </tr>
          <tr>
            <td>Create a New...</td>
            <td>Open View...</td>
          </tr>
          {renderNuDbInfo(nuDbInfo)}
          <tr>
            <td>{makeLink("create", "builtin:template", "Design Template")}</td>
            <td>{makeLink("view", "builtin:design", "Design")}</td>
          </tr>
          <tr>
            <td>{makeLink("create", "builtin:view", "Design View")}</td>
          </tr>
          <tr className="separator">
            <td colSpan={2} />
          </tr>
        </tbody>
      </table>
      <ul>
        <li>
          <u>
            <Link to={`/${props.db.name}/edit/info`}>Edit the Info doc</Link>
          </u>
        </li>
        <li>
          <u>
            <Link to="/databases/create/main">Create a new Database</Link>
          </u>
        </li>
      </ul>
      <Credits />
    </MenuItem>
  );
};

export default MenuItemDatabase;
