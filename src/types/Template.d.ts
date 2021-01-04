import { EditField } from "./Field";

export interface Template {
  _id: string;
  content: TemplateBlock[];
  description?: string;
  template: string;
}

export type TemplateBlockType =
  | "h1"
  | "h2"
  | "h3"
  | "p"
  | "code"
  | "arraytable";

export interface TemplateBlockShared {
  border?: string;
  margin?: string;
  padding?: string;
  type: TemplateBlockType;
}

export interface TemplateBlockFlex extends TemplateBlockShared {
  alignItems?: string; // TODO vals
  cells: TemplateCell[];
  flexWrap?: string; // TODO vals
  justifyContent?: string; // TODO vals
}

export interface TemplateBlockArrayTable extends TemplateBlockShared {
  backgroundColor?: string;
  columns: TemplateArrayTableColumn[];
  id: string;
  type: "arraytable";
}

export interface TemplateArrayTableColumn {
  field: EditField;
  heading?: string;
}

export type TemplateBlock = TemplateBlockFlex | TemplateBlockArrayTable;

export interface TemplateCell {
  backgroundColor?: string;
  border?: string;
  color?: string;
  field?: EditField;
  flex?: string;
  padding?: string;
  text?: string;
}
