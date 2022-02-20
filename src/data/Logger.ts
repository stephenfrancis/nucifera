export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogMessage {
  level: LogLevel;
  raised_at: Date;
  // seq: number;
  text: string;
}

// const logstack = [];
let latest_msg: LogMessage = null;
const callbacks = [];

export function debug(text: string) {
  msg(text, "debug");
}

export function error(text: string) {
  msg(text, "error");
}

// export function getAll(): LogMessage[] {
//   return logstack;
// }

export function getLatest(): LogMessage {
  // return logstack.length > 0 ? logstack[logstack.length - 1] : null;
  return latest_msg;
}

export function info(text: string) {
  msg(text, "info");
}

export function msg(text_or_other: any, level: LogLevel) {
  let text;
  if (typeof text_or_other === "string") {
    text = text_or_other;
  } else if (typeof text_or_other.message === "string") {
    text = text_or_other.message;
    if (text_or_other.docId) text += ` document '${text_or_other.docId}'`;
  } else {
    console.error(`non-string passed to logger function`);
    text = String(JSON.stringify(text_or_other));
  }
  const consoleMsg = `msg(${level}, ${text}) callbacks: ${callbacks.length}`;
  const msg = {
    level,
    raised_at: new Date(),
    // seq: logstack.length,
    text,
  };

  const invokeMsg = () => {
    latest_msg = msg;
    callbacks.forEach((funct) => funct(msg));
  };

  if (level === "error") {
    console.error(consoleMsg);
    invokeMsg();
  } else {
    console.log(consoleMsg);
    if (latest_msg?.level !== "error") invokeMsg();
  }
  if (level === "debug") {
    // TODO introduce proper loglevels
    return;
  }
  // logstack.push(msg);
}

export function registerNewMessageCallback(funct: (msg: LogMessage) => void) {
  callbacks.push(funct);
}

export function unRegisterNewMessageCallback(funct: (msg: LogMessage) => void) {
  callbacks.splice(callbacks.indexOf(funct), 1);
}

export function warn(text: string) {
  msg(text, "warn");
}
