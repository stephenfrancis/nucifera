import * as React from "react";
import { NumberEditField, NumberShowField } from "../../types/Field";

interface Props {
  field: NumberEditField;
  handleFieldBlur: () => void;
  value_container: any;
  value_key: string | number;
}

export function Editable(props: Props): JSX.Element {
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
      type="number"
    />
  );
}

interface UneditableProps {
  field: NumberShowField;
  value: string;
}

export function Uneditable(props: UneditableProps): JSX.Element {
  return <>{String(props.value)}</>;
}
