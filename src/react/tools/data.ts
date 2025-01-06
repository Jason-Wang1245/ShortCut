import { Group, Link } from "../types";

function initLocalStorage() {
  localStorage.setItem("shortcut", JSON.stringify([]));
}

function writeToLocalStorage(newData: Group[]) {
  localStorage.setItem("shortcut", JSON.stringify(newData));
}

export function addGroup(groupName: string) {
  if (localStorage.getItem("shortcut") === null) initLocalStorage();
  const localData: Group[] = [...JSON.parse(localStorage.getItem("shortcut")!)];

  localData.push({ name: groupName, links: [] });
  writeToLocalStorage(localData);
}

export function getLocalStorageData(): Group[] | null {
  return localStorage.getItem("shortcut") != null ? JSON.parse(localStorage.getItem("shortcut")!) : null;
}
