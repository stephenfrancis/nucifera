export interface View {
  type: "list";
  columns: ViewColumn[];
}

export interface ViewColumn {
  id: string;
  initialWidth?: Width;
  label: string;
}

export type FixedWidth = "xs" | "s" | "m" | "l" | "xl";

export type Width = FixedWidth | "free";
