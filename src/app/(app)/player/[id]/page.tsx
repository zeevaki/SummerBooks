import { notFound } from "next/navigation";
import { getBookById } from "@/lib/api";
import AudioPlayer from "@/components/ui/AudioPlayer";
import styles from "./page.module.css";

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) return notFound();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{book.title}</h1>
        <p className={styles.author}>{book.author}</p>
      </div>

      <div className={styles.summary}>
        <p className={styles.paragraph}>{book.summary}</p>
      </div>

      <AudioPlayer book={book} />
    </div>
  );
}
