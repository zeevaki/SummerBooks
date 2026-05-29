"use client";

import { Book } from "@/types/book";
import SelectedBook from "@/components/ui/SelectedBook";
import BookCard from "@/components/ui/BookCard";
import styles from "./page.module.css";

interface ForYouContentProps {
  selectedBook: Book | null;
  recommendedBooks: Book[];
  suggestedBooks: Book[];
}

export default function ForYouContent({
  selectedBook,
  recommendedBooks,
  suggestedBooks,
}: ForYouContentProps) {
  const visibleRecommendedBooks = recommendedBooks.slice(0, 5);
  const visibleSuggestedBooks = suggestedBooks.slice(0, 5);

  return (
    <div className={styles.content}>
      <section className={`${styles.section} ${styles.selectedSection}`}>
        <h2 className={styles.sectionTitle}>Selected just for you</h2>
        <div className={styles.selectedCardWrapper}>
          {selectedBook ? (
            <SelectedBook book={selectedBook} />
          ) : (
            <p style={{ color: "#6b757b", fontSize: 14 }}>Could not load selected book.</p>
          )}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Recommended For You</h2>
        <p className={styles.sectionSubtitle}>We think you&apos;ll like these</p>
        <div className={styles.bookRow}>
          {visibleRecommendedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Suggested Books</h2>
        <p className={styles.sectionSubtitle}>Browse those books</p>
        <div className={styles.bookRow}>
          {visibleSuggestedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}
