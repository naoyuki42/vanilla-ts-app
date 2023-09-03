export const getButtonElement = (id: string): HTMLButtonElement | null => {
  const element = document.getElementById(id);
  return element instanceof HTMLButtonElement ? element : null;
};
