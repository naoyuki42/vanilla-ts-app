import { getButtonElement, getElement } from "../HTMLElement";
import { useState } from "../hooks";

const [counter, setCounter] = useState<number>(0, (value: number): void => {
  getElement("counter")!.textContent = String(value);
});

getButtonElement("increment")!.addEventListener("click", () => {
  setCounter(counter() + 1);
});

getButtonElement("decrement")!.addEventListener("click", () => {
  setCounter(counter() - 1);
});
