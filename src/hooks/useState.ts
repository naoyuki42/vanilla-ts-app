export const useState = <T>(
  initialState: T,
  render = (..._blank: any): void => {}
): [() => T, (nextState: T) => void] => {
  let data: T = initialState;
  render(data);
  const state = () => {
    return data;
  };
  const setState = (nextState: T): void => {
    data = nextState;
    render(state());
  };
  return [state, setState];
};
