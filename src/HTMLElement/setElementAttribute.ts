export const setElementAttribute = (
  element: HTMLElement,
  attribute: string,
  value: string
): HTMLElement => {
  element.setAttribute(attribute, value);
  return element;
};
