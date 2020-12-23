import * as React from "react";
import { BrowserRouter, Link, Redirect } from "react-router-dom";

import Body from "./Body";
import BurgerMenuDatabase from "./BurgerMenuDatabase";
import BurgerMenuDocument from "./BurgerMenuDocument";
import DisplayField from "./DisplayField";
import Document from "../data/Document";
import { editMode } from "../types/General";
import { error, info } from "../data/Logger";
import ErrorBoundary from "./ErrorBoundary";
import Footer from "./Footer";
import Header from "./Header";
import { TemplateBlock, TemplateCell } from "../types/Template";
import { getStyleProperties } from "./Utils";

interface Props {
  doc: Document;
  edit_mode: editMode;
}

const renderBlock = (
  block: TemplateBlock,
  doc: Document,
  edit_mode: editMode,
  handleFieldBlur: () => void,
  index: number
) => {
  if (block.type === "arraytable") {
    return null;
  }
  const className = `block_${block.type}`;
  const cells = block.cells.map((cell: TemplateCell, cell_index: number) => {
    return renderCell(cell, doc, edit_mode, handleFieldBlur, cell_index);
  });
  return (
    <div
      className={className}
      key={String(index)}
      style={getStyleProperties(block)}
    >
      {cells}
    </div>
  );
};

const renderCell = (
  cell: TemplateCell,
  doc: Document,
  edit_mode: editMode,
  handleFieldBlur: () => void,
  index: number
) => {
  return (
    <div className="cell" key={String(index)} style={getStyleProperties(cell)}>
      {cell.field ? (
        <DisplayField
          edit_mode={edit_mode}
          field={cell.field}
          handleFieldBlur={handleFieldBlur}
          value_container={doc.getData()}
        />
      ) : (
        cell.text
      )}
    </div>
  );
};

const DisplayDocument: React.FC<Props> = (props) => {
  const [modified, setModified] = React.useState<boolean>(
    props.edit_mode === "create"
  );
  const [redirect, setRedirect] = React.useState<string>(null);
  const [valid, setValid] = React.useState<boolean>(props.doc.isValid());

  const handleKeyboardEvents = (event: KeyboardEvent) => {
    // console.log(
    //   `DisplayView.handleKeyboardEvents() ${event.key}, shift? ${event.shiftKey}, alt? ${event.altKey}, meta? ${event.metaKey}`
    // );
    if (event.key === "s" && (event.altKey || event.metaKey)) {
      handleSaveClick();
    } else if (event.key === "e" && (event.altKey || event.metaKey)) {
      if (props.edit_mode === "show") {
        setRedirect(props.doc.getEditLink());
      } else {
        props.doc.save().catch((err) => error(err));
        setRedirect(props.doc.getShowLink());
      }
    } else if (event.key === "Escape") {
      setRedirect(props.doc.getDefaultViewLink());
    } else if (event.key === "Delete") {
      props.doc.delete();
      setRedirect(props.doc.getDefaultViewLink());
    }
  };

  const handleFieldBlur = () => {
    console.log(`handleFieldBlur(): ${props.doc.isModified()}`);
    setModified(props.doc.isModified());
    setValid(props.doc.isValid());
  };

  const handleSaveClick = () => {
    if (props.edit_mode === "show") {
      return;
    }
    if (!modified || !valid) {
      return;
    }
    props.doc.save().catch((err) => error(err));
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

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyboardEvents);
    return () => {
      window.removeEventListener("keydown", handleKeyboardEvents);
    };
  });

  const blocks = props.doc
    .getTemplate()
    .content.map((block: TemplateBlock, index: number) => {
      return renderBlock(
        block,
        props.doc,
        props.edit_mode,
        handleFieldBlur,
        index
      );
    });

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <Header />
      <Body
        burgerMenuContent={() => (
          <>
            <ErrorBoundary>
              <BurgerMenuDocument doc={props.doc} />
            </ErrorBoundary>
            <ErrorBoundary>
              <BurgerMenuDatabase db={props.doc.getDatabase()} />
            </ErrorBoundary>
          </>
        )}
      >
        <ErrorBoundary>{blocks}</ErrorBoundary>
      </Body>
      <Footer>
        {props.edit_mode === "show" ? renderShowButtons() : renderEditButtons()}
      </Footer>
    </>
  );
};

export default DisplayDocument;
