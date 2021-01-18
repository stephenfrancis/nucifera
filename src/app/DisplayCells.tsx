import * as React from "react";

import DisplayField from "./DisplayField";
import { editMode } from "../types/General";

import {
  TemplateCell,
  TemplateCellArray,
  TemplateCellContainer,
  TemplateCellField,
  TemplateCellMap,
  TemplateCellText,
} from "../types/Template";
import { getStyleProperties, useEventListener } from "./Utils";

const getCellClassName = (cell: TemplateCell, type: string) =>
  "cell cell_" + type + (cell.format ? " cell_" + cell.format : "");

const getCellType = (cell: TemplateCell) =>
  (cell as TemplateCellArray).cell
    ? "array"
    : (cell as TemplateCellContainer).cells
    ? "container"
    : (cell as TemplateCellField).field
    ? "field"
    : (cell as TemplateCellMap).map
    ? "map"
    : (cell as TemplateCellText).text
    ? "text"
    : null;

interface RenderCellProps {
  cell: TemplateCell;
  index: number;
  edit_mode: editMode;
  handleFieldBlur: () => void;
  value_container: any;
  value_key?: string | number;
}

export const Cell: React.FC<RenderCellProps> = (props) => {
  const type: string = getCellType(props.cell);
  const render = RENDER[type];
  console.log(`Cell ${type}, ${JSON.stringify(props.cell)}`);

  if (!render) {
    return <div>Unrecognized Cell Type</div>;
  }
  return (
    <div
      className={getCellClassName(props.cell, type)}
      key={String(props.index)}
      style={getStyleProperties(props.cell)}
    >
      {render(props)}
    </div>
  );
};

const CellArray: React.FC<RenderCellProps> = (props) => {
  const value_key: string = (props.cell as TemplateCellArray).id;
  const [data, setData] = React.useState<any[]>(
    props.value_container[value_key]
  );
  if (!Array.isArray(data)) {
    return <div>Value for key {value_key} is not an array</div>;
  }
  const add = () => {
    const temp = data.slice();
    temp.push(null);
    setData(temp);
  };
  const cells = data.map((child_value: any, cell_index: number) => {
    const remove = () => {
      const temp = data.slice();
      temp.splice(cell_index, 1);
      setData(temp);
    };
    return (
      <div key={String(cell_index)}>
        {props.edit_mode !== "show" && <span onClick={remove}>➖</span>}
        <Cell
          cell={(props.cell as TemplateCellArray).cell}
          index={props.index * 100 + cell_index}
          edit_mode={props.edit_mode}
          handleFieldBlur={props.handleFieldBlur}
          value_container={props.value_container[value_key]}
          value_key={cell_index}
        />
      </div>
    );
  });
  if (props.edit_mode !== "show") {
    cells.push(
      <div>
        <span onClick={add}>➕</span>
      </div>
    );
  }
  return <>{cells}</>;
};

const CellContainer: React.FC<RenderCellProps> = (props) => {
  const cells = (props.cell as TemplateCellContainer).cells.map(
    (child: TemplateCell, cell_index: number) => {
      return (
        <Cell
          cell={child}
          index={cell_index}
          edit_mode={props.edit_mode}
          handleFieldBlur={props.handleFieldBlur}
          value_container={props.value_container}
          value_key={props.value_key}
        />
      );
    }
  );
  return <>{cells}</>;
};

const CellField: React.FC<RenderCellProps> = (props) => {
  console.log(
    `renderCellField(${props.index}, ${
      (props.cell as TemplateCellField).field.id
    }, ${JSON.stringify(props.value_container)}, ${props.value_key})`
  );
  return (
    <DisplayField
      edit_mode={props.edit_mode}
      field={(props.cell as TemplateCellField).field}
      handleFieldBlur={props.handleFieldBlur}
      value_container={props.value_container}
      value_key={
        typeof props.value_key === "number" || props.value_key
          ? props.value_key
          : (props.cell as TemplateCellField).field.id
      }
    />
  );
};

const CellMap: React.FC<RenderCellProps> = (props) => {
  const value_key: string = (props.cell as TemplateCellMap).id;
  if (typeof props.value_container[value_key] !== "object") {
    return <div>Value for key {value_key} is not an object</div>;
  }
  const cells = Object.keys((props.cell as TemplateCellMap).map).map(
    (key: string, cell_index: number) => {
      return (
        <Cell
          cell={(props.cell as TemplateCellMap).map[key]}
          index={cell_index}
          edit_mode={props.edit_mode}
          handleFieldBlur={props.handleFieldBlur}
          value_container={props.value_container[value_key]}
          value_key={key}
        />
      );
    }
  );
  return <>{cells}</>;
};

const CellText: React.FC<RenderCellProps> = (props) => {
  return <>{(props.cell as TemplateCellText).text}</>;
};

const RENDER = {
  array: CellArray,
  container: CellContainer,
  field: CellField,
  map: CellMap,
  text: CellText,
};
