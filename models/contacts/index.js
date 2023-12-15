import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts", "contacts.json");

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

export const getById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);

  return contact || null;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId);

  if (!~idx) {
    return null;
  }

  const [contact] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return contact;
};

export const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);

  return newContact;
};

export const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (!~idx) {
    return null;
  }
  contacts[idx] = { ...contacts[idx], ...body };
  await updateContacts(contacts);
  return contacts[idx];
};

export const updateContacts = (contacts) => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
