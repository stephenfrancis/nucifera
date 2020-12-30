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
  id: string;
  initialWidth?: Width;
  label?: string;
  type: string;
}

export type FixedWidth = "xs" | "s" | "m" | "l" | "xl";

export type Width = FixedWidth | "free";
