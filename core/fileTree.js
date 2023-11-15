import { openDB, deleteDB, wrap, unwrap } from "idb";

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

  async addFunction(funcName, data) {
    const tx = this.db.transaction("functions", "readwrite");
    const store = tx.objectStore("functions");
    await store.add({
      name: funcName,
      data,
    });
    await tx.done;
  }

  async saveFunction(funcName, data) {
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

  async getFunction(funcName) {
    const tx = this.db.transaction("functions", "readonly");
    const store = tx.objectStore("functions");
    return store.get(funcName);
  }

  async getFunctions() {
    return this.db.getAll("functions");
  }

  async deleteFunctions() {
    await deleteDB(this._name);
  }
}
