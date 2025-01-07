import { Group, Link } from "../types";

function initLocalStorage() {
  localStorage.setItem("shortcut", JSON.stringify([]));
}

function writeToLocalStorage(newData: Group[]) {
  localStorage.setItem("shortcut", JSON.stringify(newData));
}

export function addGroup(groupName: string, groupColor: string): boolean {
  if (localStorage.getItem("shortcut") === null) initLocalStorage();
  const localData: Group[] = [...JSON.parse(localStorage.getItem("shortcut")!)];

  if (localData.find(group => group.name === groupName) != undefined) return false;

  localData.push({ name: groupName, color: groupColor, links: [] });
  writeToLocalStorage(localData);

  return true;
}

export function getLocalStorageData(): Group[] | null {
  return localStorage.getItem("shortcut") != null ? JSON.parse(localStorage.getItem("shortcut")!) : null;
}
