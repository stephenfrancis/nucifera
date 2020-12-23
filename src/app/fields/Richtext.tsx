import * as React from "react";
import TextareaAutosize from "react-autosize-textarea";

import { Field } from "../../types/Field";

interface Props {
  field: Field;
  handleFieldBlur: () => void;
  value_container: any;
}

export function Editable(props: Props): JSX.Element {
  const className = `input_${props.field.type}`;
  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    props.value_container[props.field.id] = event.target.value;
    props.handleFieldBlur();
  };
  if (props.field.hidden_for_edit) {
    return null;
  }
  return (
    <TextareaAutosize
      className={className}
      defaultValue={String(props.value_container[props.field.id] || "")}
      onBlur={handleBlur}
    />
  );
}

export function Uneditable(props: { value: string }): JSX.Element {
  return <>{String(props.value)}</>;
}
