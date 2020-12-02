import * as React from "react";

interface Props {
  db_id: string;
  view_id: string;
}

const renderLoading = () => <div>Loading...</div>;

const renderView = (id: string) => <div>Document Id: {id}</div>;

const Main: React.FC<Props> = (props) => {
  const [db, setDB] = React.useState<PouchDB.Database>(null);
  const [view, setView] = React.useState<any>(null);
  React.useEffect(() => {
    setDB(new PouchDB(props.db_id));
  }, [props.db_id]);
  React.useEffect(() => {
    if (db) {
      db.get(props.view_id)
        .then((result: any) => {
          if (result) {
            setView(result);
          } else if (props.view_id !== "all") {
            return db.get("all");
          }
        })
        .then((result: any) => {
          if (result) {
            setView(result);
            // } else  {
            //   setView(BuiltinView);
          }
        })
        .catch((err) => {
          console.error(err);
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
