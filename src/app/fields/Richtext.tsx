import * as React from "react";
import TextareaAutosize from "react-autosize-textarea";
import { RichtextEditField, RichtextShowField } from "../../types/Field";

interface EditableProps {
  field: RichtextEditField;
  handleFieldBlur: () => void;
  value_container: any;
  value_key: string | number;
}

export function Editable(props: EditableProps): JSX.Element {
  const className = `input_${props.field.type}`;
  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    props.value_container[props.value_key] = event.target.value;
    props.handleFieldBlur();
  };
  if (props.field.hidden_for_edit) {
    return null;
  }
  return (
    <TextareaAutosize
      className={className}
      defaultValue={String(props.value_container[props.value_key] || "")}
      onBlur={handleBlur}
    />
  );
}

interface UneditableProps {
  field: RichtextShowField;
  value: string;
}

export function Uneditable(props: UneditableProps): JSX.Element {
  return <>{String(props.value)}</>;
}
