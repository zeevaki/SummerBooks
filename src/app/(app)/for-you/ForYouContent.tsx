"use client";

import { Book } from "@/types/book";
import SelectedBook from "@/components/ui/SelectedBook";
import BookCard from "@/components/ui/BookCard";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
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
  const router = useRouter();

  function handleNavigateTo(e: MouseEvent, book: Book) {
    e.preventDefault();
    // On desktop (min-width:1024px) premium books go to plans page
    const isDesktop = typeof window !== "undefined" && window.matchMedia("(min-width:1024px)").matches;
    if (book.subscriptionRequired && isDesktop) {
      router.push("/choose-plan");
    } else {
      router.push(`/book/${book.id}`);
    }
  }

  return (
    <div className={styles.content}>
      <section className={`${styles.section} ${styles.selectedSection}`}>
        <h2 className={styles.sectionTitle}>Selected just for you</h2>
        <div className={styles.selectedCardWrapper}>
          {selectedBook ? (
            <div
              onClick={(e) => handleNavigateTo(e as any, selectedBook)}
              onKeyDown={(e) => {
                if ((e as any).key === "Enter") handleNavigateTo(e as any, selectedBook);
              }}
              role="button"
              tabIndex={0}
            >
              <SelectedBook book={selectedBook} noLink />
            </div>
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
            <div
              key={book.id}
              onClick={(e) => handleNavigateTo(e as any, book)}
              onKeyDown={(e) => {
                if ((e as any).key === "Enter") handleNavigateTo(e as any, book);
              }}
              role="button"
              tabIndex={0}
            >
              <BookCard book={book} noLink />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Suggested Books</h2>
        <p className={styles.sectionSubtitle}>Browse those books</p>
        <div className={styles.bookRow}>
          {visibleSuggestedBooks.map((book) => (
            <div
              key={book.id}
              onClick={(e) => handleNavigateTo(e as any, book)}
              onKeyDown={(e) => {
                if ((e as any).key === "Enter") handleNavigateTo(e as any, book);
              }}
              role="button"
              tabIndex={0}
            >
              <BookCard book={book} noLink />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
