import * as React from "react";
import { editMode } from "../types/General";
import { Template, TemplateBlock, TemplateCell } from "../types/Template";

interface Props {
  doc: any;
  template: Template;
  edit_mode: editMode;
}

const renderBlock = (
  block: TemplateBlock,
  doc: any,
  edit_mode: editMode,
  index: number
) => {
  const className = `block_${block.type}`;
  const cells = block.cells.map((cell: TemplateCell, cell_index: number) => {
    return renderCell(cell, doc, edit_mode, cell_index);
  });
  return (
    <div className={className} key={String(index)}>
      {cells}
    </div>
  );
};

const renderCell = (
  cell: TemplateCell,
  doc: any,
  edit_mode: editMode,
  index: number
) => {
  return <div key={String(index)}>{cell.text}</div>;
};

const Main: React.FC<Props> = (props) => {
  const blocks = props.template.content.map(
    (block: TemplateBlock, index: number) => {
      return renderBlock(block, props.doc, props.edit_mode, index);
    }
  );
  return <>{blocks}</>;
};

export default Main;
