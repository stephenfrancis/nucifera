import { Field } from "../../types/Field";
import {
  Template,
  TemplateBlock,
  TemplateBlockFlex,
  TemplateBlockShared,
  TemplateCell,
} from "../../types/Template";

const validate = (field: Field, val: any) => {
  if (field.mandatory && !val) {
    return "required";
  }
  switch (field.type) {
    case "date":
      if (Date.parse(val) === NaN) {
        return `invalid date: ${val}`;
      }
      break;
    case "image":
      break;
    case "json":
      // try {
      //   JSON.parse(val);
      // } catch (e) {
      //   console.error(e);
      //   return `invalid json`;
      // }
      break;
    case "number":
      const num = parseFloat(val);
      if (num === NaN) {
        return `invalid number: ${val}`;
      }
      if (typeof field.min === "number" && num < field.min) {
        return `below minimum allowed value: ${field.min}`;
      }
      if (typeof field.max === "number" && num > field.max) {
        return `above maximum allowed value: ${field.max}`;
      }
      break;
    case "options":
      break;
    case "richtext":
      break;
    case "text":
      if (typeof field.maxLength === "number" && val.length > field.maxLength) {
        return `exceeds maximum length of ${field.maxLength} characters`;
      }
      if (field.regex && !new RegExp(field.regex).exec(val)) {
        return `doesn't match pattern ${field.regex}`;
      }
      break;
  }
};

export const validateTemplate = (template: Template, value_container: any) => {
  return template.content.reduce((prev: boolean, curr: TemplateBlock) => {
    return prev && validateTemplateBlock(curr, value_container);
  }, true);
};

export const validateTemplateBlock = (
  template_block: TemplateBlock,
  value_container: any
) => {
  if ((template_block as TemplateBlockFlex).cells) {
    return (template_block as TemplateBlockFlex).cells.reduce(
      (prev: boolean, curr: TemplateCell) => {
        return (
          prev &&
          (!curr.field || !validate(curr.field, value_container[curr.field.id]))
        );
      },
      true
    );
  }
  return true;
};

export default validate;
