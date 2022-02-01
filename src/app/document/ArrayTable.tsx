import * as React from "react";

import Document from "../../data/Document";
import { editMode } from "../../types/General";
import { TemplateBlockArrayTable, TemplateCell } from "../../types/Template";
import { getStyleProperties } from "../Utils";

interface Props {
  block: TemplateBlockArrayTable;
  doc: Document;
  edit_mode: editMode;
  index: number;
}

const ArrayTable: React.FC<Props> = (props) => {
  const className = `block_${props.block.type}`;
  if (!Array.isArray(props.doc[props.block.id])) {
    return <div>Doc property is not an array</div>;
  }
  const rows = props.doc[props.block.id].map(
    (cell: TemplateCell, cell_index: number) => {
      return renderCell(cell, props.doc, props.edit_mode, cell_index);
    }
  );
  return (
    <div
      className={className}
      key={String(props.index)}
      style={getStyleProperties(props.block)}
    >
      {rows}
    </div>
  );
};

export default ArrayTable;
