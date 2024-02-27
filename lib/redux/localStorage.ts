export function loadState(key: string): void | any {
  const serializedState = typeof window !== "undefined" ? localStorage.getItem(key) : undefined;
  return serializedState ? JSON.parse(serializedState) : undefined;
}

export function saveState(key: string, data: JSON): void {
  const serializedState = JSON.stringify(data);
  window.localStorage.setItem(key, serializedState);
}

export function deleteState(key: string): void {
  window.localStorage.removeItem(key);
}
