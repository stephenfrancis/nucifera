import * as React from "react";
import { editMode } from "../types/General";
import { EditField, ShowField } from "../types/Field";
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
  field: EditField;
  edit_mode: editMode;
  handleFieldBlur: () => void;
  value_container: any;
  value_key: string | number;
}

const renderEditable = (
  field: EditField,
  handleFieldBlur: () => void,
  value_container: any,
  value_key: string | number
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
    <div className={className} id={field.id} key={value_key || field.id}>
      <div>
        {renderEditableInner(
          field,
          handleFieldBlurInner,
          value_container,
          value_key
        )}
      </div>
      {error && <div>{error}</div>}
    </div>
  );
};

const renderEditableInner = (
  field: EditField,
  handleFieldBlur: () => void,
  value_container: any,
  value_key: string | number
) => {
  switch (field.type) {
    case "date":
      return (
        <DateEditable
          field={field}
          handleFieldBlur={handleFieldBlur}
          value_container={value_container}
          value_key={value_key}
        />
      );
    case "image":
      return (
        <ImageEditable
          field={field}
          handleFieldBlur={handleFieldBlur}
          value_container={value_container}
          value_key={value_key}
        />
      );
    case "json":
      return (
        <JSONEditable
          field={field}
          handleFieldBlur={handleFieldBlur}
          value_container={value_container}
          value_key={value_key}
        />
      );
    case "number":
      return (
        <NumberEditable
          field={field}
          handleFieldBlur={handleFieldBlur}
          value_container={value_container}
          value_key={value_key}
        />
      );
    case "options":
      return (
        <OptionsEditable
          field={field}
          handleFieldBlur={handleFieldBlur}
          value_container={value_container}
          value_key={value_key}
        />
      );
    case "richtext":
      return (
        <RichtextEditable
          field={field}
          handleFieldBlur={handleFieldBlur}
          value_container={value_container}
          value_key={value_key}
        />
      );
    case "text":
      return (
        <TextEditable
          field={field}
          handleFieldBlur={handleFieldBlur}
          value_container={value_container}
          value_key={value_key}
        />
      );
    default:
      return <div>??</div>;
  }
};

export const renderUneditable = (
  field: ShowField,
  value_container: any,
  value_key: string | number
) => {
  const value: any = value_container[value_key];
  switch (field.type) {
    case "date":
      return <DateUneditable field={field} value={value} />;
    case "image":
      return <ImageUneditable field={field} value={value} />;
    case "json":
      return <JSONUneditable field={field} value={value} />;
    case "number":
      return <NumberUneditable field={field} value={value} />;
    case "options":
      return <OptionsUneditable field={field} value={value} />;
    case "richtext":
      return <RichtextUneditable field={field} value={value} />;
    case "text":
      return <TextUneditable field={field} value={value} />;
    default:
      return <div>??</div>;
  }
};

const DisplayField: React.FC<Props> = (props) => {
  return props.edit_mode === "show"
    ? renderUneditable(props.field, props.value_container, props.value_key)
    : renderEditable(
        props.field,
        props.handleFieldBlur,
        props.value_container,
        props.value_key
      );
};

export default DisplayField;
