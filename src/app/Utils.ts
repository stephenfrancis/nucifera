const style_properties = [
  "alignItems",
  "backgroundColor",
  "border",
  "color",
  "flexWrap",
  "fontSize",
  "fontWeight",
  "justifyContent",
  "margin",
  "padding",
];

export function getStyleProperties(obj: any) {
  const out = {};
  Object.keys(obj).forEach((prop) => {
    if (style_properties.indexOf(prop) > -1) {
      out[prop] = obj[prop];
    }
  });
  return out;
}
