const LOCAL_STORAGE_KEY = "shortcut";

type Shortcut = {
  [key: string]: { name: string; link: string }[];
};

export function addTab(name: string) {
  const storageJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  const storageObject: Shortcut = storageJson ? JSON.parse(storageJson) : {};

  if (name in storageObject) {
    return false;
  }

  storageObject[name] = [];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storageObject));
  return true;
}

export function deleteTab(name: string) {
  const storageJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  const storageObject: Shortcut = storageJson ? JSON.parse(storageJson) : {};

  if (name in storageObject) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [name]: _, ...rest } = storageObject;

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rest));
    return true;
  }

  return false;
}

export function getData() {
  const storageJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  const storageObject: Shortcut = storageJson ? JSON.parse(storageJson) : {};

  return storageObject;
}

export function createShortcut(tab: string, name: string, link: string) {
  const storageJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  const storageObject: Shortcut = storageJson ? JSON.parse(storageJson) : {};

  if (tab in storageObject) {
    storageObject[tab].push({ name, link });

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storageObject));
    return true;
  }

  return false;
}

export function deleteShortcut(tab: string, index: number) {
  const storageJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  const storageObject: Shortcut = storageJson ? JSON.parse(storageJson) : {};

  if (!(tab in storageObject)) return false;
  if (index < 0 || index >= storageObject[tab].length) return false;

  storageObject[tab].splice(index, 1);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storageObject));
  return true;
}
