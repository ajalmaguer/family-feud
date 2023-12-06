const backupLocalStorage: Record<string, string> = {};

export const LocalStorageService = {
  getItem: (key: string) => {
    if (!localStorage) {
      return backupLocalStorage[key];
    }
    return localStorage?.getItem(key);
  },
  setItem: (key: string, value: string) => {
    if (!localStorage) {
      backupLocalStorage[key] = value;
    }
    localStorage?.setItem(key, value);
  },
};
