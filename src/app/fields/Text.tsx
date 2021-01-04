import * as React from "react";
import { TextEditField, TextShowField } from "../../types/Field";

interface EditableProps {
  field: TextEditField;
  handleFieldBlur: () => void;
  value_container: any;
}

export function Editable(props: EditableProps): JSX.Element {
  const className = `input_${props.field.type}`;
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    props.value_container[props.field.id] = event.target.value;
    props.handleFieldBlur();
  };
  if (props.field.hidden_for_edit) {
    return null;
  }
  return (
    <input
      className={className}
      defaultValue={String(props.value_container[props.field.id] || "")}
      onBlur={handleBlur}
      placeholder={props.field.id}
      type="text"
    />
  );
}

interface UneditableProps {
  field: TextShowField;
  value: string;
}

export function Uneditable(props: UneditableProps): JSX.Element {
  return <>{String(props.value)}</>;
}
