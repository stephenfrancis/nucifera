import { Field } from "./Field";

export interface Template {
  _id: string;
  content: TemplateBlock[];
  template: string;
}

export type TemplateBlockType = "h1" | "h2" | "h3" | "p" | "code";

export interface TemplateBlock {
  alignItems?: string; // TODO vals
  border?: string;
  cells: TemplateCell[];
  flexWrap?: string; // TODO vals
  justifyContent?: string; // TODO vals
  margin?: string;
  padding?: string;
  type: TemplateBlockType;
}

export interface TemplateCell {
  backgroundColor?: string;
  border?: string;
  color?: string;
  field?: Field;
  padding?: string;
  text?: string;
}
