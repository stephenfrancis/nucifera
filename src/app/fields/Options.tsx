import * as React from "react";
import { OptionsEditField, OptionsShowField } from "../../types/Field";

interface EditableProps {
  field: OptionsEditField;
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
    />
  );
}

interface UneditableProps {
  field: OptionsShowField;
  value: string;
}

export function Uneditable(props: UneditableProps): JSX.Element {
  return <>{String(props.value)}</>;
}
