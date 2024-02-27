import { DateTime } from "luxon";

export function getCookie(name: string): string {
  const regex = new RegExp(`(?:(?:^|.*;*)${name}*=*([^;]*).*$)|^.*$`);
  return document.cookie.replace(regex, "$1");
}

export const dateFull = (dateValue: string): string => {
  return DateTime.fromISO(dateValue, { zone: 'UTC' })
    .setLocale("ru")
    .toFormat("DDD");
};

export const range = (length: number) => {
  return Array.from({ length }, (v, k) => k + 1);
}

export function sanitize(str: string, pattern: RegExp | string, maxLength?: number): string {
  let sanitized = str.replace(new RegExp(`[^${pattern}]+`, "g"), "");
  sanitized = sanitized.trim();
  return maxLength ? sanitized.slice(0, maxLength) : sanitized;
}

export const dateShort = (dateValue: string): string => {
  return DateTime.fromISO(dateValue, { zone: 'UTC' })
    .setLocale("ru")
    .toFormat("dd-LL-yyyy");
};

export const descriptionRows = (value: string): string => {
  const descriptionLength = value ? value.split("\n").length : 1;
  return descriptionLength > 1 ? String(descriptionLength) : '1';
}
