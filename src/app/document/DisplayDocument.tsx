import * as React from "react";
import { Link, Navigate } from "react-router-dom";

import { Cell } from "./DisplayCells";
import Document from "../../data/Document";
import { editMode } from "../../types/General";
import { error } from "../../data/Logger";
import ErrorBoundary from "../page/ErrorBoundary";
import Footer from "../page/Footer";
import Header from "../page/Header";
import Mainarea from "../page/Mainarea";
import MenuItemDatabase from "../menu/MenuItemDatabase";
import MenuItemDocument from "../menu/MenuItemDocument";

import { TemplateCell } from "../../types/Template";
import { getStyleProperties, useEventListener } from "../Utils";

interface Props {
  doc: Document;
  edit_mode: editMode;
}

const DisplayDocument: React.FC<Props> = (props) => {
  const [modified, setModified] = React.useState<boolean>(
    props.edit_mode === "create"
  );
  const [redirect, setRedirect] = React.useState<string>(null);
  const [valid, setValid] = React.useState<boolean>(props.doc.isValid());

  useEventListener(
    "keydown",
    React.useCallback((event: KeyboardEvent) => {
      // console.log(
      //   `DisplayView.handleKeyboardEvents() ${event.key}, shift? ${event.shiftKey}, alt? ${event.altKey}, meta? ${event.metaKey}`
      // );
      if (event.key === "s" && (event.altKey || event.metaKey)) {
        performSave(false);
      } else if (event.key === "e" && (event.altKey || event.metaKey)) {
        if (props.edit_mode === "show") {
          setRedirect(props.doc.getEditLink());
        } else {
          performSave(true);
        }
      } else if (event.key === "Escape") {
        setRedirect(props.doc.getDefaultViewLink());
      } else if (event.key === "Delete") {
        props.doc.delete();
        setRedirect(props.doc.getDefaultViewLink());
      }
    }, [])
  );

  const handleFieldBlur = () => {
    console.log(`handleFieldBlur(): ${props.doc.isModified()}`);
    setModified(props.doc.isModified());
    setValid(props.doc.isValid());
  };

  const handleSaveClick = () => {
    performSave(true);
  };

  const performSave = (redirect_if_successful: boolean) => {
    if (props.edit_mode === "show") {
      return;
    }
    if (!modified || !valid) {
      return;
    }
    props.doc
      .save()
      .then(() => {
        if (redirect_if_successful) {
          setRedirect(props.doc.getShowLink());
        }
      })
      .catch((err) => error(err));
  };

  const renderEditButtons = () => (
    <>
      {modified && valid && (
        <a className="button_pri" onClick={handleSaveClick}>
          Save
        </a>
      )}
      {(!modified || !valid) && <a className="button_disabled">Save</a>}
      <Link
        className="button_sec"
        to={
          props.edit_mode === "create"
            ? props.doc.getDefaultViewLink()
            : props.doc.getShowLink()
        }
      >
        Cancel
      </Link>
    </>
  );

  const renderShowButtons = () => (
    <>
      <Link className="button_pri" to={props.doc.getEditLink()}>
        Edit
      </Link>
      <Link className="button_sec" to={props.doc.getDefaultViewLink()}>
        Back to View
      </Link>
    </>
  );

  const blocks = props.doc
    .getTemplate()
    .content.map((cell: TemplateCell, index: number) => {
      return (
        <Cell
          cell={cell}
          index={index}
          key={String(index)}
          edit_mode={props.edit_mode}
          handleFieldBlur={handleFieldBlur}
          value_container={props.doc.getData()}
        />
      );
    });

  return (
    <>
      {redirect && <Navigate to={redirect} />}
      <Header>
        <ErrorBoundary>
          <MenuItemDatabase db={props.doc.getDatabase()} />
        </ErrorBoundary>
        <ErrorBoundary>
          <MenuItemDocument doc={props.doc} />
        </ErrorBoundary>
      </Header>
      <Mainarea className={props.edit_mode}>
        <ErrorBoundary>{blocks}</ErrorBoundary>
      </Mainarea>
      <Footer>
        {props.edit_mode === "show" ? renderShowButtons() : renderEditButtons()}
      </Footer>
    </>
  );
};

export default DisplayDocument;
