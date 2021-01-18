import React from "react";

const style_properties = [
  "alignItems",
  "backgroundColor",
  "border",
  "color",
  "flex",
  "flexDirection",
  "flexFlow",
  "flexGrow",
  "flexShrink",
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

type KeyboardEventHandler = (event: KeyboardEvent) => void;

export function useEventListener(
  eventName: "keyup" | "keydown" | "keypress",
  handler: KeyboardEventHandler
) {
  // Create a ref that stores handler
  const savedHandler = React.useRef<KeyboardEventHandler>();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(
    () => {
      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);

      // Add event listener
      window.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        window.removeEventListener(eventName, eventListener);
      };
    },
    [eventName] // Re-run if eventName changes
  );
}
