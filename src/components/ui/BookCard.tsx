import Image from "next/image";
import Link from "next/link";
import { BsClock, BsStar } from "react-icons/bs";
import { Book } from "@/types/book";
import { formatDuration } from "@/lib/api";
import styles from "./BookCard.module.css";

interface BookCardProps {
  book: Book;
  /** When true the card will not render a link; useful when parent handles navigation */
  noLink?: boolean;
}

export default function BookCard({ book, noLink }: BookCardProps) {
  const Container: any = noLink ? "div" : Link;
  const containerProps = noLink
    ? { className: styles.card }
    : { href: `/book/${book.id}`, className: styles.card };

  return (
    // @ts-ignore - `Container` may be string or Link component
    <Container {...containerProps} role={noLink ? "button" : undefined}>
      <div className={styles.imageWrapper}>
        {book.subscriptionRequired && (
          <div className={styles.pill}>Premium</div>
        )}
        <Image
          src={book.imageLink}
          alt={book.title}
          width={200}
          height={200}
          className={styles.image}
          unoptimized
        />
      </div>

      <div className={styles.info}>
        <p className={styles.title}>{book.title}</p>
        <p className={styles.author}>{book.author}</p>
        <p className={styles.subTitle}>{book.subTitle}</p>
        <div className={styles.meta}>
          {book.duration && (
            <span className={styles.metaItem}>
              <BsClock />
              {formatDuration(book.duration)}
            </span>
          )}
          <span className={styles.metaItem}>
            <BsStar />
            {book.averageRating?.toFixed(1)}
          </span>
        </div>
      </div>
    </Container>
  );
}
