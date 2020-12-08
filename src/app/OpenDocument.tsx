import * as React from "react";

import Database from "../data/Database";
import DisplayDocument from "./DisplayDocument";
import Document from "../data/Document";
import Loading from "./Loading";
import { error, info } from "../data/Logger";
import { editMode } from "../types/General";

interface Props {
  db_id: string;
  doc_id: string;
  edit_mode: editMode;
  template_id?: string; // for create mode only
}

const OpenDocument: React.FC<Props> = (props) => {
  const [db, setDB] = React.useState<Database>(null);
  const [doc, setDoc] = React.useState<Document>(null);
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
        .then((temp_doc: Document) => {
          setDoc(temp_doc);
        })
        .catch((err) => {
          error(err);
        });
    }
  }, [db?.name, props.doc_id]);

  return (
    <>
      {!!doc && <DisplayDocument doc={doc} edit_mode={props.edit_mode} />}
      {!doc && <Loading />}
    </>
  );
};

export default OpenDocument;
