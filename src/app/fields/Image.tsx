import * as React from "react";
import { ImageEditField, ImageShowField } from "../../types/Field";

interface EditableProps {
  field: ImageEditField;
  handleFieldBlur: () => void;
  value_container: any;
  value_key: string | number;
}

export function Editable(props: EditableProps): JSX.Element {
  const className = `input_${props.field.type}`;
  const [imgSrc, setImgSrc] = React.useState<any>(null);
  React.useEffect(() => {
    const data = props.value_container[props.value_key];
    if (data) {
      setImgSrc(URL.createObjectURL(data));
    }
  }, []);
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImgSrc(URL.createObjectURL(event.target.files[0]));
      props.value_container[props.value_key] = event.target.files[0];
    }
    props.handleFieldBlur();
  };
  if (props.field.hidden_for_edit) {
    return null;
  }
  return (
    <div className={className}>
      <input
        accept="image/*"
        onBlur={handleBlur}
        placeholder={props.field.id}
        type="file"
      />
      {imgSrc && <img src={imgSrc} />}
    </div>
  );
}

interface UneditableProps {
  field: ImageShowField;
  value: string;
}

export function Uneditable(props: UneditableProps): JSX.Element {
  const [imgSrc, setImgSrc] = React.useState<any>(null);
  React.useEffect(() => {
    if (props.value) {
      setImgSrc(URL.createObjectURL(props.value));
    }
  }, []);
  return <>{imgSrc && <img src={imgSrc} className="display_image" />}</>;
}
