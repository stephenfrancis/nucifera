interface CommonField {
  id: string;
  hidden_for_edit?: boolean;
  mandatory?: boolean;
}

export interface DateField extends CommonField {
  type: "date";
}

export interface ImageField extends CommonField {
  type: "image";
}

export interface JSONField extends CommonField {
  type: "json";
}

export interface NumberField extends CommonField {
  max?: number;
  min?: number;
  type: "number";
}

export interface OptionsField extends CommonField {
  type: "options";
  options: string[];
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
  | ImageField
  | JSONField
  | NumberField
  | OptionsField
  | RichTextField
  | TextField;
