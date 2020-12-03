import * as React from "react";

import Database from "../data/Database";
import Loading from "./Loading";
import { error, info } from "../data/Logger";
import { View } from "../types/View";

interface Props {
  db_id: string;
  view_id: string;
}

const renderLoading = () => <div>Loading...</div>;

const renderView = (id: string) => <div>Document Id: {id}</div>;

const Main: React.FC<Props> = (props) => {
  const [db, setDB] = React.useState<Database>(null);
  const [view, setView] = React.useState<View>(null);
  React.useEffect(() => {
    setDB(new Database(props.db_id));
  }, [props.db_id]);
  React.useEffect(() => {
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
      {!!view && renderView(props.view_id)}
      {!view && renderLoading()}
    </>
  );
};

export default Main;
