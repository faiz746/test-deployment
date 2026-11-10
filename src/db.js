import Dexie from "dexie";

export const db = new Dexie("UserDB");

db.version(1).stores({
  users: "++id, name, age",
});
