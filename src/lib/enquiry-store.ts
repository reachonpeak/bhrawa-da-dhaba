import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { getAdminFirestore } from "./firebase-admin";

export interface Enquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  eventDate?: string;
  guests?: string;
  eventType?: string;
  message?: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "enquiries.json");
const ENQUIRIES_COLLECTION = "enquiries";

async function readFromFile(): Promise<Enquiry[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as Enquiry[];
  } catch {
    return [];
  }
}

async function writeToFile(data: Enquiry[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, FILE);
}

export async function saveEnquiry(input: Omit<Enquiry, "createdAt">): Promise<void> {
  const enquiry: Enquiry = {
    ...input,
    createdAt: new Date().toISOString(),
  };

  const db = getAdminFirestore();
  if (db) {
    await db.collection(ENQUIRIES_COLLECTION).add(enquiry);
  } else {
    const existing = await readFromFile();
    existing.push(enquiry);
    await writeToFile(existing);
  }
}

export async function getEnquiries(): Promise<Enquiry[]> {
  const db = getAdminFirestore();
  if (db) {
    const snap = await db.collection(ENQUIRIES_COLLECTION).orderBy("createdAt", "desc").get();
    return snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
        eventDate: data.eventDate,
        guests: data.guests,
        eventType: data.eventType,
        message: data.message,
        createdAt: data.createdAt ?? new Date().toISOString(),
      };
    });
  } else {
    const list = await readFromFile();
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}
