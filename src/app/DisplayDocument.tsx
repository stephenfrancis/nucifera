import * as React from "react";
import { BrowserRouter, Link } from "react-router-dom";

import Body from "./Body";
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

const Main: React.FC<Props> = (props) => {
  const blocks = props.doc
    .getTemplate()
    .content.map((block: TemplateBlock, index: number) => {
      return renderBlock(block, props.doc, props.edit_mode, index);
    });
  const handleClick = () => {
    props.doc.save();
  };
  blocks.push(
    <div key="button_block">
      {props.edit_mode === "show" ? (
        <Link to={props.doc.getEditLink()}>Edit</Link>
      ) : (
        <>
          <button className="button_pri" onClick={handleClick}>
            Save
          </button>
          <Link to={props.doc.getShowLink()}>Cancel</Link>
        </>
      )}
    </div>
  );
  return (
    <>
      <Header />
      <Body>{blocks}</Body>
      <Footer />
    </>
  );
};

export default Main;
