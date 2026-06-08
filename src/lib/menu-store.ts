import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { getAdminFirestore } from "./firebase-admin";
import { menu as seedMenu, type MenuCategory, type MenuItem } from "./menu";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "menu.json");

// Where the menu lives in Firestore: collection "site", document "menu",
// with the whole category array under the `categories` field. The full menu is
// small (~25 KB) — well under Firestore's 1 MB document limit — so storing it
// as one document keeps the CRUD logic identical to the old JSON-file model
// (read whole array, mutate, write whole array) and reads are atomic.
const MENU_COLLECTION = "site";
const MENU_DOC = "menu";

function cloneSeed(): MenuCategory[] {
  return JSON.parse(JSON.stringify(seedMenu)) as MenuCategory[];
}

// --- Filesystem fallback (local dev only, when Firebase isn't configured) ---

async function readFromFile(): Promise<MenuCategory[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as MenuCategory[];
  } catch {
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(FILE, JSON.stringify(seedMenu, null, 2), "utf8");
    } catch {
      // read-only filesystem — fall back to the in-memory seed
    }
    return cloneSeed();
  }
}

async function writeToFile(data: MenuCategory[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, FILE);
}

// --- Firestore-backed store (production / whenever Firebase is configured) ---

async function getMenu(): Promise<MenuCategory[]> {
  const db = getAdminFirestore();
  if (!db) return readFromFile();

  const ref = db.collection(MENU_COLLECTION).doc(MENU_DOC);
  const snap = await ref.get();
  const data = snap.exists ? (snap.data()?.categories as MenuCategory[] | undefined) : undefined;
  if (Array.isArray(data)) return data;

  // First run: seed Firestore with the built-in menu so it can be edited.
  const seed = cloneSeed();
  await ref.set({ categories: seed });
  return seed;
}

async function saveMenu(data: MenuCategory[]): Promise<void> {
  const db = getAdminFirestore();
  if (!db) return writeToFile(data);
  await db.collection(MENU_COLLECTION).doc(MENU_DOC).set({ categories: data });
}

export { getMenu };

export async function findItemAsync(id: string): Promise<MenuItem | undefined> {
  const m = await getMenu();
  for (const c of m) {
    const it = c.items.find((i) => i.id === id);
    if (it) return it;
  }
  return undefined;
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

// --- Category CRUD ---

export async function createCategory(input: Omit<MenuCategory, "items"> & { items?: MenuItem[] }): Promise<MenuCategory> {
  const m = await getMenu();
  if (!input.slug) throw new Error("Slug is required");
  if (m.some((c) => c.slug === input.slug)) throw new Error("A category with that slug already exists");
  const created: MenuCategory = {
    slug: input.slug,
    title: input.title,
    subtitle: input.subtitle,
    items: input.items ?? [],
  };
  m.push(created);
  await saveMenu(m);
  return created;
}

export async function updateCategory(slug: string, patch: Partial<Omit<MenuCategory, "items">>): Promise<MenuCategory> {
  const m = await getMenu();
  const c = m.find((x) => x.slug === slug);
  if (!c) throw new Error("Category not found");
  if (patch.title !== undefined) c.title = patch.title;
  if (patch.subtitle !== undefined) c.subtitle = patch.subtitle;
  await saveMenu(m);
  return c;
}

export async function deleteCategoryBySlug(slug: string): Promise<void> {
  const m = await getMenu();
  await saveMenu(m.filter((c) => c.slug !== slug));
}

export async function reorderCategory(slug: string, direction: "up" | "down"): Promise<void> {
  const m = await getMenu();
  const i = m.findIndex((c) => c.slug === slug);
  if (i < 0) return;
  const j = direction === "up" ? i - 1 : i + 1;
  if (j < 0 || j >= m.length) return;
  [m[i], m[j]] = [m[j], m[i]];
  await saveMenu(m);
}

// --- Item CRUD ---

export async function createItem(categorySlug: string, input: MenuItem): Promise<MenuItem> {
  const m = await getMenu();
  const c = m.find((x) => x.slug === categorySlug);
  if (!c) throw new Error("Category not found");
  if (!input.id) throw new Error("Item id is required");
  if (c.items.some((i) => i.id === input.id)) throw new Error("An item with that id already exists in this category");
  c.items.push(input);
  await saveMenu(m);
  return input;
}

export async function updateItem(categorySlug: string, id: string, patch: Partial<MenuItem>): Promise<MenuItem> {
  const m = await getMenu();
  const c = m.find((x) => x.slug === categorySlug);
  if (!c) throw new Error("Category not found");
  const i = c.items.findIndex((it) => it.id === id);
  if (i < 0) throw new Error("Item not found");
  c.items[i] = { ...c.items[i], ...patch, id: c.items[i].id }; // id immutable here
  await saveMenu(m);
  return c.items[i];
}

export async function deleteItem(categorySlug: string, id: string): Promise<void> {
  const m = await getMenu();
  const c = m.find((x) => x.slug === categorySlug);
  if (!c) return;
  c.items = c.items.filter((i) => i.id !== id);
  await saveMenu(m);
}

export async function reorderItem(categorySlug: string, id: string, direction: "up" | "down"): Promise<void> {
  const m = await getMenu();
  const c = m.find((x) => x.slug === categorySlug);
  if (!c) return;
  const i = c.items.findIndex((it) => it.id === id);
  if (i < 0) return;
  const j = direction === "up" ? i - 1 : i + 1;
  if (j < 0 || j >= c.items.length) return;
  [c.items[i], c.items[j]] = [c.items[j], c.items[i]];
  await saveMenu(m);
}
