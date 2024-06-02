export const setLocalStorageData = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
