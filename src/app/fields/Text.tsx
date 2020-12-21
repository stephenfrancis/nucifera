import * as React from "react";
import { Field } from "../../types/Field";

interface Props {
  field: Field;
  value_container: any;
}

export function Editable(props: Props): JSX.Element {
  const className = `input_${props.field.type}`;
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    props.value_container[props.field.id] = event.target.value;
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

export function Uneditable(props: { value: string }): JSX.Element {
  return <>{String(props.value)}</>;
}
