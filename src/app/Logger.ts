export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogMessage {
  level: LogLevel;
  message: string;
}

const logstack = [];
const callbacks = [];

export function debug(message: string) {
  msg({
    level: "debug",
    message,
  });
}

export function error(message: string) {
  msg({
    level: "error",
    message,
  });
}

export function info(message: string) {
  msg({
    level: "info",
    message,
  });
}

export function msg(msg: LogMessage) {
  console.log(
    `msg(${msg.level}, ${msg.message}) callbacks: ${callbacks.length}`
  );
  if (msg.level === "debug") {
    // TODO introduce proper loglevels
    return;
  }
  logstack.unshift(msg);
  callbacks.forEach((funct) => funct(msg));
}

export function registerNewMessageCallback(funct: (msg: LogMessage) => void) {
  callbacks.push(funct);
}

export function warn(message: string) {
  msg({
    level: "warn",
    message,
  });
}
