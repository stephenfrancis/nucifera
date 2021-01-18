import { EditField } from "./Field";

export interface Template {
  _id: string;
  content: TemplateCell[];
  description?: string;
  template: string;
}

export type TemplateCellFormat = "h1" | "h2" | "h3" | "p" | "code";

export interface TemplateCellShared {
  alignItems?: string; // TODO vals
  backgroundColor?: string;
  border?: string;
  color?: string;
  flex?: string;
  flexWrap?: string; // TODO vals
  format?: TemplateCellFormat;
  justifyContent?: string; // TODO vals
  margin?: string;
  padding?: string;
}

export interface TemplateCellArray extends TemplateCellShared {
  cell: TemplateCell;
  id: string;
}

export interface TemplateCellContainer extends TemplateCellShared {
  cells: TemplateCell[];
}

export interface TemplateCellField extends TemplateCellShared {
  field: EditField;
}

export interface TemplateCellMap extends TemplateCellShared {
  id: string;
  map: Record<string, TemplateCell>;
}

export interface TemplateCellText extends TemplateCellShared {
  text: string;
}

export type TemplateCell =
  | TemplateCellArray
  | TemplateCellContainer
  | TemplateCellField
  | TemplateCellMap
  | TemplateCellText;
