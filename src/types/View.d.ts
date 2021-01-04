import { ShowField } from "./Field";

export interface View {
  _id: string;
  columns: ViewColumn[];
  description?: string;
  index?: any;
  selector?: any;
  sort?: string[];
  template: string;
  type: "list";
}

export interface ViewColumn {
  field: ShowField;
  initialWidth?: Width;
  label?: string;
}

export type FixedWidth = "xs" | "s" | "m" | "l" | "xl";

export type Width = FixedWidth | "free";
