export const useState = <T>(
  initialState: T,
  render?: (data: T) => void
): [() => T, (nextState: T) => void] => {
  let data: T = initialState;
  if (render !== undefined) render(data);
  const state = () => {
    return data;
  };
  const setState = (nextState: T): void => {
    data = nextState;
    if (render !== undefined) render(state());
  };
  return [state, setState];
};
