export class LocalStorageMock {
  items: Map<string, string>;

  constructor() {
    this.items = new Map();
  }

  setItem(keyName: string, keyValue: string) {
    this.items.set(keyName, keyValue);
  }
  getItem(keyName: string) {
    return this.items.get(keyName) ?? null;
  }
  removeItem(keyName: string) {
    this.items.delete(keyName);
  }
  clear() {
    this.items.clear();
  }

  get length() {
    return this.items.size;
  }
}
