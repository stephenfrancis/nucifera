import * as React from "react";
import { BrowserRouter, Link, Redirect } from "react-router-dom";

import Body from "./Body";
import BurgerMenuDatabase from "./BurgerMenuDatabase";
import BurgerMenuDocument from "./BurgerMenuDocument";
import DisplayField from "./DisplayField";
import Document from "../data/Document";
import { editMode } from "../types/General";
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
  index: number
) => {
  const className = `block_${block.type}`;
  const cells = block.cells.map((cell: TemplateCell, cell_index: number) => {
    return renderCell(cell, doc, edit_mode, cell_index);
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
  index: number
) => {
  return (
    <div className="cell" key={String(index)} style={getStyleProperties(cell)}>
      {cell.field ? (
        <DisplayField
          edit_mode={edit_mode}
          field={cell.field}
          value_container={doc.getData()}
        />
      ) : (
        cell.text
      )}
    </div>
  );
};

const DisplayDocument: React.FC<Props> = (props) => {
  const [redirect, setRedirect] = React.useState<string>(null);

  const handleKeyboardEvents = (event: KeyboardEvent) => {
    console.log(
      `DisplayView.handleKeyboardEvents() ${event.key}, shift? ${event.shiftKey}, alt? ${event.altKey}, meta? ${event.metaKey}`
    );
    if (event.key === "s" && (event.altKey || event.metaKey)) {
      handleSaveClick();
    } else if (event.key === "e" && (event.altKey || event.metaKey)) {
      if (props.edit_mode === "show") {
        setRedirect(props.doc.getEditLink());
      } else {
        props.doc.save();
        setRedirect(props.doc.getShowLink());
      }
    } else if (event.key === "Escape") {
      setRedirect(props.doc.getDefaultViewLink());
    }
  };

  const handleSaveClick = () => {
    if (props.edit_mode === "show") {
      return;
    }
    props.doc.save();
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyboardEvents);
    return () => {
      window.removeEventListener("keydown", handleKeyboardEvents);
    };
  });

  const blocks = props.doc
    .getTemplate()
    .content.map((block: TemplateBlock, index: number) => {
      return renderBlock(block, props.doc, props.edit_mode, index);
    });
  blocks.push(
    <div className="block_p" key="button_block">
      {props.edit_mode === "show" ? (
        <>
          <div className="cell">
            <Link className="button_pri" to={props.doc.getEditLink()}>
              Edit
            </Link>
          </div>
          <div className="cell">
            <Link className="button_sec" to={props.doc.getDefaultViewLink()}>
              Back to View
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="cell">
            <button className="button_pri" onClick={handleSaveClick}>
              Save
            </button>
          </div>
          <div className="cell">
            <Link className="button_sec" to={props.doc.getShowLink()}>
              Cancel
            </Link>
          </div>
        </>
      )}
    </div>
  );
  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <Header />
      <Body
        burgerMenuContent={() => (
          <>
            <BurgerMenuDocument doc={props.doc} />
            <BurgerMenuDatabase db={props.doc.getDatabase()} />
          </>
        )}
      >
        {blocks}
      </Body>
      <Footer />
    </>
  );
};

export default DisplayDocument;
