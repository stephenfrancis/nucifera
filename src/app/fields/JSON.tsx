import * as React from "react";
import TextareaAutosize from "react-autosize-textarea";
import { JSONEditField, JSONShowField } from "../../types/Field";

interface EditableProps {
  field: JSONEditField;
  handleFieldBlur: () => void;
  value_container: any;
}

export function Editable(props: EditableProps): JSX.Element {
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

interface UneditableProps {
  field: JSONShowField;
  value: string;
}

export function Uneditable(props: UneditableProps): JSX.Element {
  return <>{JSON.stringify(props.value, null, 2)}</>;
}
