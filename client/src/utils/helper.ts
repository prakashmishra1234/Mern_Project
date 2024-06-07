export const setLocalStorageData = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const matchEmailSchema = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
