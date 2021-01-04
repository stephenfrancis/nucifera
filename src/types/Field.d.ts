export type FieldType =
  | "date"
  | "image"
  | "json"
  | "number"
  | "options"
  | "richtext"
  | "text";

export interface CommonShowField {
  id: string;
  type: FieldType;
}

export type DateType = "date-only" | "date-time" | "time-only";

export type DateBrevity = "very-short" | "short" | "medium" | "long";

export interface DateShowField extends CommonShowField {
  date_brevity?: DateBrevity;
  date_fns_format?: string;
  date_type?: DateType;
  type: "date";
}

export interface ImageShowField extends CommonShowField {
  type: "image";
}

export interface JSONShowField extends CommonShowField {
  type: "json";
}

export interface NumberShowField extends CommonShowField {
  type: "number";
}

export interface OptionsShowField extends CommonShowField {
  type: "options";
}

export interface RichtextShowField extends CommonShowField {
  type: "richtext";
}

export interface TextShowField extends CommonShowField {
  type: "text";
}

export type ShowField =
  | DateShowField
  | ImageShowField
  | JSONShowField
  | NumberShowField
  | OptionsShowField
  | RichtextShowField
  | TextShowField;

export interface CommonEditField {
  hidden_for_edit?: boolean;
  mandatory?: boolean;
}

export interface DateEditField extends DateShowField, CommonEditField {}

export interface ImageEditField extends ImageShowField, CommonEditField {}

export interface JSONEditField extends JSONShowField, CommonEditField {}

export interface NumberEditField extends NumberShowField, CommonEditField {
  max?: number;
  min?: number;
}

export interface OptionsEditField extends OptionsShowField, CommonEditField {
  options: string[];
}

export interface RichtextEditField extends RichtextShowField, CommonEditField {}

export interface TextEditField extends TextShowField, CommonEditField {
  maxLength?: number;
  regex?: string;
}

export type EditField =
  | DateEditField
  | ImageEditField
  | JSONEditField
  | NumberEditField
  | OptionsEditField
  | RichtextEditField
  | TextEditField;
