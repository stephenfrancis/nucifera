import * as React from "react";
import { Template, TemplateBlock, TemplateCell } from "../types/Template";

interface Props {
  doc: any;
  template: Template;
  edit_mode: boolean;
}

const renderBlock = (block: TemplateBlock, doc: any, edit_mode: boolean) => {
  const className = `block_${block.type}`;
  const cells = block.cells.map((cell: TemplateCell) => {
    return renderCell(cell, doc, edit_mode);
  });
  return <div className={className}>{cells}</div>;
};

const renderCell = (cell: TemplateCell, doc: any, edit_mode: boolean) => {
  return <div>{cell.text}</div>;
};

const Main: React.FC<Props> = (props) => {
  const blocks = props.template.content.map((block: TemplateBlock) => {
    return renderBlock(block, props.doc, props.edit_mode);
  });
  return <>{blocks}</>;
};

export default Main;
