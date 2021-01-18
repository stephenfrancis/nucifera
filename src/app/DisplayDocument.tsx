import * as React from "react";
import { BrowserRouter, Link, Redirect } from "react-router-dom";

import { Cell } from "./DisplayCells";
import Document from "../data/Document";
import { editMode } from "../types/General";
import { error, info } from "../data/Logger";
import ErrorBoundary from "./ErrorBoundary";
import Footer from "./Footer";
import Header from "./Header";
import Mainarea from "./Mainarea";
import MenuItemDatabase from "./MenuItemDatabase";
import MenuItemDocument from "./MenuItemDocument";

import { TemplateCell } from "../types/Template";
import { getStyleProperties, useEventListener } from "./Utils";

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
        performSave();
      } else if (event.key === "e" && (event.altKey || event.metaKey)) {
        if (props.edit_mode === "show") {
          setRedirect(props.doc.getEditLink());
        } else {
          performSave(props.doc.getShowLink());
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
    performSave(props.doc.getShowLink());
  };

  const performSave = (redirect_if_successful?: string) => {
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
          setRedirect(redirect_if_successful);
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
      <Link className="button_sec" to={props.doc.getShowLink()}>
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
          edit_mode={props.edit_mode}
          handleFieldBlur={handleFieldBlur}
          value_container={props.doc.getData()}
        />
      );
    });

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <Header>
        <ErrorBoundary>
          <MenuItemDatabase db={props.doc.getDatabase()} />
        </ErrorBoundary>
        <ErrorBoundary>
          <MenuItemDocument doc={props.doc} />
        </ErrorBoundary>
      </Header>
      <Mainarea>
        <ErrorBoundary>{blocks}</ErrorBoundary>
      </Mainarea>
      <Footer>
        {props.edit_mode === "show" ? renderShowButtons() : renderEditButtons()}
      </Footer>
    </>
  );
};

export default DisplayDocument;
