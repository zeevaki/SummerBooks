import Image from "next/image";
import Link from "next/link";
import { BsClock, BsStar } from "react-icons/bs";
import { Book } from "@/types/book";
import { formatDuration } from "@/lib/api";
import styles from "./BookCard.module.css";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/book/${book.id}`} className={styles.card}>
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
    </Link>
  );
}
