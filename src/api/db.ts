export const setToLocalStorage = (name: string, value: any) => {
  localStorage.setItem(name, JSON.stringify(value));
};
