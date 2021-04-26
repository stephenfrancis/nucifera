import * as React from "react";

import Database from "../data/Database";
import DisplayView from "./DisplayView";
import Loading from "./Loading";
import { error, info } from "../data/Logger";
import View from "../data/View";

interface Props {
  db_id: string;
  view_id: string;
}

const OpenView: React.FC<Props> = (props) => {
  const [db, setDB] = React.useState<Database>(null);
  const [view, setView] = React.useState<View>(null);
  React.useEffect(() => {
    setDB(new Database(props.db_id));
  }, [props.db_id]);
  React.useEffect(() => {
    setView(null);
    if (db) {
      db.getView(props.view_id)
        .then((temp_view: View) => {
          setView(temp_view);
        })
        .catch((err) => {
          error(err);
        });
    }
  }, [db?.name, props.view_id]);

  return (
    <>
      {!!view && <DisplayView view={view} />}
      {!view && <Loading />}
    </>
  );
};

export default OpenView;
