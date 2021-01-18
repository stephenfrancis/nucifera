import * as React from "react";
import { format, isValid } from "date-fns";
import { DateEditField, DateShowField } from "../../types/Field";
import { user_locale } from "../Locale";

const BREVITY = ["very-short", "short", "medium", "long"];

const getDateTimeFormat = (field: DateShowField) => {
  if (field.date_fns_format) {
    return field.date_fns_format;
  }
  const brevity: number = Math.max(BREVITY.indexOf(field.date_brevity), 0); // not found => "very-short"
  if (field.date_type === "date-only") {
    return "P".repeat(brevity + 1);
  } else if (field.date_type === "time-only") {
    return "p".repeat(brevity + 1);
  }
  return "P".repeat(brevity + 1) + "p".repeat(brevity + 1);
};

interface EditableProps {
  field: DateEditField;
  handleFieldBlur: () => void;
  value_container: any;
  value_key: string | number;
}

export function Editable(props: EditableProps): JSX.Element {
  const className = `input_${props.field.type}`;
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    props.value_container[props.value_key] = event.target.value;
    props.handleFieldBlur();
  };
  if (props.field.hidden_for_edit) {
    return null;
  }
  return (
    <input
      className={className}
      defaultValue={String(props.value_container[props.value_key] || "")}
      onBlur={handleBlur}
      placeholder={props.field.id}
      type="datetime"
    />
  );
}

interface UneditableProps {
  field: DateShowField;
  value: string;
}

export function Uneditable(props: UneditableProps): JSX.Element {
  const date_time_format = getDateTimeFormat(props.field);
  const date = new Date(props.value);
  console.log(`showing date: ${date}, with format: ${date_time_format}`);
  return (
    <>
      {(isValid(date) &&
        format(date, date_time_format, {
          locale: user_locale,
        })) ||
        "--"}
    </>
  );
}
