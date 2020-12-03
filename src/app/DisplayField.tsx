import * as React from "react";
import { editMode } from "../types/General";
import { Field } from "../types/Field";

interface Props {
  field: Field;
  edit_mode: editMode;
  value_container: any;
}

const renderEditable = (field: Field, value_container: any) => {
  const className = `input_${field.type}`;
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    value_container[field.id] = event.target.value;
  };
  const handleTextAreaBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    value_container[field.id] = event.target.value;
  };
  if (field.hidden_for_edit) {
    return null;
  }
  if (field.type === "richtext") {
    return (
      <textarea
        className={className}
        defaultValue={String(value_container[field.id] || "")}
        onBlur={handleTextAreaBlur}
      />
    );
  }
  return (
    <input
      className={className}
      defaultValue={String(value_container[field.id] || "")}
      onBlur={handleBlur}
      placeholder={field.id}
    />
  );
};

const renderUneditable = (value: any) => {
  return <>{String(value)}</>;
};

const Main: React.FC<Props> = (props) => {
  return props.edit_mode === "show"
    ? renderUneditable(props.value_container[props.field.id] || "--")
    : renderEditable(props.field, props.value_container);
};

export default Main;
