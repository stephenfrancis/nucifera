import * as React from "react";
import { editMode } from "../types/General";
import { Field } from "../types/Field";
import {
  Editable as DateEditable,
  Uneditable as DateUneditable,
} from "./fields/Date";
import {
  Editable as ImageEditable,
  Uneditable as ImageUneditable,
} from "./fields/Image";
import {
  Editable as JSONEditable,
  Uneditable as JSONUneditable,
} from "./fields/JSON";
import {
  Editable as NumberEditable,
  Uneditable as NumberUneditable,
} from "./fields/Number";
import {
  Editable as OptionsEditable,
  Uneditable as OptionsUneditable,
} from "./fields/Options";
import {
  Editable as RichtextEditable,
  Uneditable as RichtextUneditable,
} from "./fields/Richtext";
import {
  Editable as TextEditable,
  Uneditable as TextUneditable,
} from "./fields/Text";
import validate from "./fields/validate";

interface Props {
  field: Field;
  edit_mode: editMode;
  handleFieldBlur: () => void;
  value_container: any;
}

const renderEditable = (
  field: Field,
  handleFieldBlur: () => void,
  value_container: any
) => {
  const [error, setError] = React.useState<string | null>(
    validate(field, value_container[field.id])
  );
  const className = error ? "field_error" : null;
  const handleFieldBlurInner = () => {
    setError(validate(field, value_container[field.id]));
    handleFieldBlur();
  };
  return (
    <div className={className} id={field.id}>
      <div>
        {renderEditableInner(field, handleFieldBlurInner, value_container)}
      </div>
      {error && <div>{error}</div>}
    </div>
  );
};

const renderEditableInner = (
  field: Field,
  handleFieldBlur: () => void,
  value_container: any
) => {
  switch (field.type) {
    case "date":
      return (
        <DateEditable
          field={field}
          handleFieldBlur={handleFieldBlur}
          value_container={value_container}
        />
      );
    case "image":
      return (
        <ImageEditable
          field={field}
          handleFieldBlur={handleFieldBlur}
          value_container={value_container}
        />
      );
    case "json":
      return (
        <JSONEditable
          field={field}
          handleFieldBlur={handleFieldBlur}
          value_container={value_container}
        />
      );
    case "number":
      return (
        <NumberEditable
          field={field}
          handleFieldBlur={handleFieldBlur}
          value_container={value_container}
        />
      );
    case "options":
      return (
        <OptionsEditable
          field={field}
          handleFieldBlur={handleFieldBlur}
          value_container={value_container}
        />
      );
    case "richtext":
      return (
        <RichtextEditable
          field={field}
          handleFieldBlur={handleFieldBlur}
          value_container={value_container}
        />
      );
    case "text":
      return (
        <TextEditable
          field={field}
          handleFieldBlur={handleFieldBlur}
          value_container={value_container}
        />
      );
    default:
      return <div>??</div>;
  }
};

const renderUneditable = (field: Field, value_container: any) => {
  const value: any = value_container[field.id] || "--";
  switch (field.type) {
    case "date":
      return <DateUneditable value={value} />;
    case "image":
      return <ImageUneditable value={value} />;
    case "json":
      return <JSONUneditable value={value} />;
    case "number":
      return <NumberUneditable value={value} />;
    case "options":
      return <OptionsUneditable value={value} />;
    case "richtext":
      return <RichtextUneditable value={value} />;
    case "text":
      return <TextUneditable value={value} />;
    default:
      return <div>??</div>;
  }
};

const DisplayField: React.FC<Props> = (props) => {
  return props.edit_mode === "show"
    ? renderUneditable(props.field, props.value_container)
    : renderEditable(props.field, props.handleFieldBlur, props.value_container);
};

export default DisplayField;
