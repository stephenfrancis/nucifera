import { Field } from "./Field";

export interface Template {
  _id: string;
  content: TemplateBlock[];
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
  field: Field;
  heading?: string;
}

export type TemplateBlock = TemplateBlockFlex | TemplateBlockArrayTable;

export interface TemplateCell {
  backgroundColor?: string;
  border?: string;
  color?: string;
  field?: Field;
  padding?: string;
  text?: string;
}
