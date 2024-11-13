import { openDB } from 'idb';

const initDB = async () => {
    return openDB('contactForm-db', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('contacts')) {
                db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
            }
        },
    });
};

export const addContact = async (contact) => {
    try {
        const db = await initDB();
        await db.add('contacts', contact);
        console.log("Data berhasil disimpan!");
    } catch (error) {
        console.error("Gagal menyimpan data:", error);
    }
};


