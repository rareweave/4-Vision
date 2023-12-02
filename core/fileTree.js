import { openDB, deleteDB } from "idb";

export class fileTree {
  constructor(name) {
    this.db = null;
    this._name = name;
    this._objStore = "functions";
  }

  async _init() {
    this.db = await openDB(this._name, 1, {
      upgrade(db) {
        // Create object stores or perform other database upgrades
        const store = db.createObjectStore("functions", {
          keyPath: "name",
        });
      },
    });
  }

  async addFiles(functionsArray) {
    const tx = this.db.transaction("functions", "readwrite");
    const store = tx.objectStore("functions");
    for (const func of functionsArray) {
      await store.add({
        name: func.name,
        data: func.data,
      });
    }
    await tx.done;
  }

  async saveFile(funcName, data) {
    const tx = this.db.transaction("functions", "readwrite");
    const store = tx.objectStore("functions");
    const existingData = await store.get(funcName);

    if (existingData) {
      await store.put({
        name: funcName,
        data,
      });
    }

    await tx.done;
  }

  async deleteFile(funcName) {
    const tx = this.db.transaction("functions", "readwrite");
    const store = tx.objectStore("functions");
    await store.delete(funcName);
    await tx.done;
  }

  async getFile(funcName) {
    const tx = this.db.transaction("functions", "readonly");
    const store = tx.objectStore("functions");
    return store.get(funcName);
  }

  async getFiles() {
    return this.db.getAll("functions");
  }

  async deleteFiles() {
    console.log(await deleteDB(this._name));
  }

  async listFolders() {}
}
