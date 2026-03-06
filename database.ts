import { setTimeout as sleep } from "node:timers/promises";
export const database = [
  { id: 1, title: "todo1" },
  { id: 2, title: "todo2" },
];

export async function createTodo(title: string) {
  await sleep(5000);
  throw new Error("Something went wrong!");
  database.push({ id: database.length + 1, title: title });
}

export function getTodos() {
  return database;
}
