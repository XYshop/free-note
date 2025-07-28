/**
 * @name getElement
 * @description Returns the first element that matches the specified selector.
 * @param selection - The CSS selector to match.
 */
const getElement = (selection: string) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(
    `Please check "${selection}" selector, no such element exist`,
  );
};

/**
 * @name formatDateFormMs
 * @description Formats a date in milliseconds to a short date and time string.
 */
const dateFormater = new Intl.DateTimeFormat("en-US", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "UTC",
});
const formatDateFromMs = (ms: number) => {
  return dateFormater.format(ms);
};

export { getElement, formatDateFromMs };
