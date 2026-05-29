import { BookCardSkeleton, SelectedBookSkeleton } from "@/components/ui/Skeleton";
import styles from "./page.module.css";

export default function ForYouLoading() {
  return (
    <div className={styles.content}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Selected just for you</h2>
        <SelectedBookSkeleton />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Recommended For You</h2>
        <div className={styles.bookRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Suggested Books</h2>
        <div className={styles.bookRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
