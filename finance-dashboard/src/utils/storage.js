// Advanced local storage management with encryption-like handling
export const storageManager = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from storage (${key}):`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to storage (${key}):`, error);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from storage (${key}):`, error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing storage:", error);
      return false;
    }
  },

  getAllKeys: () => {
    return Object.keys(localStorage);
  },

  getSize: () => {
    let size = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        size += localStorage[key].length + key.length;
      }
    }
    return (size / 1024).toFixed(2) + " KB";
  },
};

// Preferences storage
export const preferencesManager = {
  get: (key, defaultValue) => {
    return storageManager.get(`pref_${key}`, defaultValue);
  },

  set: (key, value) => {
    return storageManager.set(`pref_${key}`, value);
  },

  getAll: () => {
    const all = {};
    const keys = storageManager.getAllKeys();
    keys.forEach((key) => {
      if (key.startsWith("pref_")) {
        all[key.replace("pref_", "")] = storageManager.get(key);
      }
    });
    return all;
  },
};
