import * as React from "react";

import Database from "../data/Database";
import DisplayDocument from "./DisplayDocument";
import Loading from "./Loading";
import { error, info } from "../data/Logger";
import { editMode } from "../types/General";
import { Template } from "../types/Template";

interface Props {
  db_id: string;
  doc_id: string;
  edit_mode: editMode;
  template_id?: string; // for create mode only
}

const Main: React.FC<Props> = (props) => {
  const [db, setDB] = React.useState<Database>(null);
  const [doc, setDoc] = React.useState<any>(null);
  const [template, setTemplate] = React.useState<Template>(null);
  React.useEffect(() => {
    setDB(new Database(props.db_id));
  }, [props.db_id]);
  React.useEffect(() => {
    if (db) {
      const promise =
        props.edit_mode === "create"
          ? db.createNewDocumentFromTemplate(props.doc_id)
          : db.getExistingDocumentAndTemplate(props.doc_id);
      promise
        .then(([temp_doc, temp_template]) => {
          setDoc(temp_doc);
          setTemplate(temp_template);
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
