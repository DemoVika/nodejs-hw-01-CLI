import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  // нужен массив объектов
  const buffer = await fs.readFile(contactPath); // возвращает текст или буфер
  return JSON.parse(buffer); // превращает строку в массив объектов
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
}

const updateContact = (contacts) =>
  fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));

export async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContact(contacts);
  return newContact;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContact(contacts);
  return result;
}
