import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encodeSortParams(sort: { field: string, direction?: "asc" | "desc" }[]): string {
  return sort.map((s, index) => {
    const fieldParam = `sort[${index}][field]=${encodeURIComponent(s.field)}`;
    const directionParam = s.direction ? `&sort[${index}][direction]=${encodeURIComponent(s.direction)}` : '';
    return `${fieldParam}${directionParam}`;
  }).join('&');
}
