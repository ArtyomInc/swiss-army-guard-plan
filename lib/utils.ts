import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decimalToTime(decimal: number) {
  const hours = Math.floor(decimal);
  const minutes = Math.round((decimal - hours) * 60);

  return `${hours}h${minutes < 10 ? "0" + minutes : minutes}`;
}

export function randomID() {
  return Math.round(Math.random() * 100_000);
}

export function normalizeDate(date: Date | string): Date {
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);
  return normalizedDate;
}

export function calculateDaysBetweenDates(beginDT: Date, endDT: Date) {
  const normalizedBeginDT = normalizeDate(beginDT);
  const normalizedEndDT = normalizeDate(endDT);

  const differenceInMilliseconds =
    normalizedEndDT.getTime() - normalizedBeginDT.getTime();

  return Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
}
