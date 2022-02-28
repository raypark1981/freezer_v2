const mySession = window.sessionStorage;

export const getSession = (key) => {
  return mySession.getItem(key);
};

export const setSession = (key, value) => {
  if (typeof value === "object") {
    mySession.setItem(JSON.stringify(value));
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
