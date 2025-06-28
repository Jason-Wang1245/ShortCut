type Shortcut = {
  [key: string]: { name: string; link: string }[];
};

export function addTab(name: string) {
  const storageJson = localStorage.getItem("shortcut");
  const storageObject: Shortcut = storageJson ? JSON.parse(storageJson) : {};

  if (name in storageObject) {
    return false;
  }

  storageObject[name] = [];
  localStorage.setItem("shortcut", JSON.stringify(storageObject));
  return true;
}

export function getData() {
  const storageJson = localStorage.getItem("shortcut");
  const storageObject: Shortcut = storageJson ? JSON.parse(storageJson) : {};

  return storageObject;
}
