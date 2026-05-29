import { Book } from "@/types/book";

const BASE_URL = "https://us-central1-summaristt.cloudfunctions.net";

async function fetchBooks(status: string): Promise<Book[]> {
  const res = await fetch(`${BASE_URL}/getBooks?status=${status}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `API error for "${status}": ${res.status} ${res.statusText} — ${text}`
    );
  }
  return res.json();
}

export async function getSelectedBook(): Promise<Book | null> {
  try {
    const data = await fetchBooks("selected");
    // API returns an array despite docs saying single object
    return Array.isArray(data) ? data[0] ?? null : data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getBookById(id: string): Promise<Book | null> {
  try {
    const res = await fetch(`${BASE_URL}/getBook?id=${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const text = await res.text();
    if (!text) return null;
    return JSON.parse(text);
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getRecommendedBooks(): Promise<Book[]> {
  try {
    return await fetchBooks("recommended");
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getSuggestedBooks(): Promise<Book[]> {
  try {
    return await fetchBooks("suggested");
  } catch (err) {
    console.error(err);
    return [];
  }
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function formatDurationLong(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m} mins ${s} secs`;
}
