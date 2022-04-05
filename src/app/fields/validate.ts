import { EditField } from "../../types/Field";
import {
  Template,
  TemplateCell,
  TemplateCellContainer,
  TemplateCellField,
} from "../../types/Template";

const validate = (field: EditField, val: any) => {
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
  if (!Array.isArray(template.content)) {
    throw new Error(`fault with template content: ${JSON.stringify(template)}`);
  }
  return template.content.reduce((prev: boolean, curr: TemplateCell) => {
    return prev && validateTemplateCell(curr, value_container);
  }, true);
};

export const validateTemplateCell = (
  template_block: TemplateCell,
  value_container: any
) => {
  const cells = (template_block as TemplateCellContainer).cells;
  const field = (template_block as TemplateCellField).field;
  if (field) {
    return !validate(field, value_container[field.id]);
  } else if (cells) {
    return cells.reduce((prev: boolean, curr: TemplateCell) => {
      return prev && validateTemplateCell(curr, value_container);
    }, true);
  }
  return true;
};

export default validate;
