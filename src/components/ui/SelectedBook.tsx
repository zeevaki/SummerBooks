import Image from "next/image";
import Link from "next/link";
import { BsPlayCircleFill } from "react-icons/bs";
import { Book } from "@/types/book";
import { formatDurationLong } from "@/lib/api";
import styles from "./SelectedBook.module.css";

interface SelectedBookProps {
  book: Book;
  /** When true, render as non-link so parent can handle clicks */
  noLink?: boolean;
}

export default function SelectedBook({ book, noLink }: SelectedBookProps) {
  const Container: any = noLink ? "div" : Link;
  const containerProps = noLink ? { className: styles.card } : { href: `/book/${book.id}`, className: styles.card };

  return (
    // @ts-ignore - Container may be string or Link
    <Container {...containerProps} role={noLink ? "button" : undefined}>
      <div className={styles.subtitle}>{book.subTitle}</div>

      <div className={styles.divider} />

      <div className={styles.coverWrapper}>
        <Image
          src={book.imageLink}
          alt={book.title}
          width={140}
          height={200}
          className={styles.cover}
          unoptimized
        />
      </div>

      <div className={styles.details}>
        <p className={styles.title}>{book.title}</p>
        <p className={styles.author}>{book.author}</p>
        <div className={styles.duration}>
          <BsPlayCircleFill className={styles.playIcon} />
          <span>{book.duration ? formatDurationLong(book.duration) : "3 mins 23 secs"}</span>
        </div>
      </div>
    </Container>
  );
}
