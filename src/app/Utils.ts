import React from "react";

const style_properties = [
  "alignItems",
  "backgroundColor",
  "border",
  "color",
  "flex",
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

export function useEventListener(eventName, handler, element = window) {
  // Create a ref that stores handler
  const savedHandler = React.useRef<(event: any) => void>();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);

      // Add event listener
      element.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}
