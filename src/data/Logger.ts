export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogMessage {
  level: LogLevel;
  raised_at: Date;
  seq: number;
  text: string;
}

const logstack = [];
const callbacks = [];

export function debug(text: string) {
  msg(text, "debug");
}

export function error(text: string) {
  msg(text, "error");
}

export function getAll(): LogMessage[] {
  return logstack;
}

export function info(text: string) {
  msg(text, "info");
}

export function msg(text: string, level: LogLevel) {
  console.log(`msg(${level}, ${text}) callbacks: ${callbacks.length}`);
  if (level === "debug") {
    // TODO introduce proper loglevels
    return;
  }
  const msg = {
    level,
    raised_at: new Date(),
    seq: logstack.length,
    text,
  };
  logstack.push(msg);
  callbacks.forEach((funct) => funct(msg));
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
