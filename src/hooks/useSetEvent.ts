export const useSetEvent = <T extends keyof HTMLElementEventMap>(
  type: T,
  buttonElement: HTMLButtonElement,
  event: EventListener
) => {
  buttonElement.addEventListener(type, event);
};
