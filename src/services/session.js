const mySession = window.sessionStorage;
const myLocalStorage = window.localStorage;

export const getSession = (key, defaultValue) => {
  try {
    return JSON.parse(mySession.getItem(key)) || defaultValue;
  } catch {
    return mySession.getItem(key);
  }
};

export const setSession = (key, value) => {
  if (typeof value === "object") {
    mySession.setItem(key, JSON.stringify(value));
  } else {
    return mySession.setItem(key, value);
  }
};

export const clearSession = () => {
  mySession.clear();
};

export const removeSession = (key) => {
  mySession.removeItem(key);
};

export const getLogal = (key, defaultValue) => {
  try {
    return JSON.parse(myLocalStorage.getItem(key)) || defaultValue;
  } catch {
    return myLocalStorage.getItem(key);
  }
};

export const setLocal = (key, value) => {
  if (typeof value === "object") {
    myLocalStorage.setItem(key, JSON.stringify(value));
  } else {
    return myLocalStorage.setItem(key, value);
  }
};

export const clearLocal = () => {
  myLocalStorage.clear();
};

export const removeLocal = (key) => {
  myLocalStorage.removeItem(key);
};
