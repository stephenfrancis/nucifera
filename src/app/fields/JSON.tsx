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
    try {
      props.value_container[props.field.id] = JSON.parse(event.target.value);
      props.handleFieldBlur();
    } catch (e) {
      console.error(e);
    }
  };
  if (props.field.hidden_for_edit) {
    return null;
  }
  return (
    <TextareaAutosize
      className={className}
      defaultValue={JSON.stringify(
        props.value_container[props.field.id] || {},
        undefined,
        2
      )}
      onBlur={handleBlur}
    />
  );
}

export function Uneditable(props: { value: any }): JSX.Element {
  return <>{JSON.stringify(props.value, null, 2)}</>;
}
