interface CommonField {
  id: string;
  mandatory?: boolean;
}

export interface DateField extends CommonField {
  type: "date";
}

export interface NumberField extends CommonField {
  max?: number;
  min?: number;
  type: "number";
}

export interface OptionsField extends CommonField {
  type: "options";
}

export interface RichTextField extends CommonField {
  type: "richtext";
}

export interface TextField extends CommonField {
  maxLength?: number;
  regex?: string;
  type: "text";
}

export type Field =
  | DateField
  | NumberField
  | OptionsField
  | RichTextField
  | TextField;
