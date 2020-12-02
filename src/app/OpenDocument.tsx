import * as React from "react";
import PouchDB from "pouchdb";

import BuiltinTemplate from "./builtin_template.json";
import DisplayDocument from "./DisplayDocument";
import Loading from "./Loading";
import { error, info } from "./Logger";
import { Template } from "../types/Template";

interface Props {
  db_id: string;
  doc_id: string;
  edit_mode: boolean;
}

const renderLoading = () => <div>Loading...</div>;

const Main: React.FC<Props> = (props) => {
  const [db, setDB] = React.useState<PouchDB.Database>(null);
  const [doc, setDoc] = React.useState<any>(null);
  const [template, setTemplate] = React.useState<Template>(null);
  React.useEffect(() => {
    info(`opening database: ${props.db_id}`);
    setDB(new PouchDB(props.db_id));
  }, [props.db_id]);
  React.useEffect(() => {
    if (db) {
      info(`getting document: ${props.doc_id}`);
      db.get(props.doc_id)
        .then((result: any) => {
          setDoc(result);
          const template_id = result.template;
          if (
            template_id &&
            template_id !== "main" &&
            (!template || template.id !== template_id)
          ) {
            info(`getting template: ${template_id}`);
            return db.get(template_id);
          }
        })
        .then((result: any) => {
          if (result) {
            setTemplate(result);
          } else if (!template || template.id !== "main") {
            info(`getting template: main`);
            return db.get("main");
          }
        })
        .then((result: any) => {
          if (result) {
            setTemplate(result);
          } else if (!template) {
            info(`getting template: builtin`);
            setTemplate(BuiltinTemplate as Template);
          }
        })
        .catch((err) => {
          error(err);
          console.error(err);
        });
    }
  }, [db?.name, props.doc_id]);

  return (
    <>
      {!!doc && !!template && (
        <DisplayDocument
          doc={doc}
          edit_mode={props.edit_mode}
          template={template}
        />
      )}
      {(!doc || !template) && <Loading />}
    </>
  );
};

export default Main;
