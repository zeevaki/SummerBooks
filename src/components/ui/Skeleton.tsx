import styles from "./Skeleton.module.css";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

/** Generic shimmer block — use for one-off skeletons */
export function Skeleton({ width, height, className }: SkeletonProps) {
  return (
    <span
      className={`${styles.skeleton} ${className ?? ""}`}
      style={{ width, height }}
    />
  );
}

/** Skeleton for a book card (recommended / suggested sections) */
export function BookCardSkeleton() {
  return (
    <div className={styles.cardWrapper}>
      <span className={`${styles.skeleton} ${styles.cardImage}`} />
      <span className={`${styles.skeleton} ${styles.cardLine}`} style={{ width: "90%" }} />
      <span className={`${styles.skeleton} ${styles.cardLineShort}`} />
      <span className={`${styles.skeleton} ${styles.cardLine}`} style={{ width: "80%" }} />
      <span className={`${styles.skeleton} ${styles.cardMeta}`} />
    </div>
  );
}

/** Skeleton for the "Selected just for you" card */
export function SelectedBookSkeleton() {
  return (
    <div className={styles.selectedWrapper}>
      <div className={styles.selectedText}>
        <span className={`${styles.skeleton} ${styles.cardLine}`} style={{ width: "90%", background: "linear-gradient(90deg,#e8d9bc 25%,#ddd0ae 50%,#e8d9bc 75%)", backgroundSize: "200% 100%" }} />
        <span className={`${styles.skeleton} ${styles.cardLine}`} style={{ width: "70%", background: "linear-gradient(90deg,#e8d9bc 25%,#ddd0ae 50%,#e8d9bc 75%)", backgroundSize: "200% 100%" }} />
        <span className={`${styles.skeleton} ${styles.cardLine}`} style={{ width: "50%", background: "linear-gradient(90deg,#e8d9bc 25%,#ddd0ae 50%,#e8d9bc 75%)", backgroundSize: "200% 100%" }} />
      </div>
      <span className={styles.selectedCover} />
      <div className={styles.selectedDetails}>
        <span className={`${styles.skeleton} ${styles.cardLine}`} style={{ width: "80%", background: "linear-gradient(90deg,#e8d9bc 25%,#ddd0ae 50%,#e8d9bc 75%)", backgroundSize: "200% 100%" }} />
        <span className={`${styles.skeleton} ${styles.cardLineShort}`} style={{ background: "linear-gradient(90deg,#e8d9bc 25%,#ddd0ae 50%,#e8d9bc 75%)", backgroundSize: "200% 100%" }} />
        <span className={`${styles.skeleton} ${styles.cardLine}`} style={{ width: "50%", background: "linear-gradient(90deg,#e8d9bc 25%,#ddd0ae 50%,#e8d9bc 75%)", backgroundSize: "200% 100%" }} />
      </div>
    </div>
  );
}

/** Skeleton for the book detail page */
export function BookPageSkeleton() {
  return (
    <>
      <div className={styles.bookPageWrapper}>
        <span className={`${styles.skeleton} ${styles.bookCoverSkeleton}`} />
        <div className={styles.bookInfoWrapper}>
          <Skeleton height={32} width="80%" />
          <Skeleton height={18} width="40%" />
          <Skeleton height={16} width="90%" />
          <Skeleton height={16} width="70%" />
          <Skeleton height={1} width="100%" />
          <div style={{ display: "flex", gap: 20 }}>
            <Skeleton height={16} width={120} />
            <Skeleton height={16} width={100} />
            <Skeleton height={16} width={100} />
          </div>
          <Skeleton height={1} width="100%" />
          <div style={{ display: "flex", gap: 12 }}>
            <Skeleton height={44} width={160} />
            <Skeleton height={44} width={160} />
          </div>
        </div>
      </div>
      <div className={styles.bookDescWrapper}>
        <Skeleton height={24} width="50%" />
        {[100, 95, 90, 85, 100, 80].map((w, i) => (
          <Skeleton key={i} height={14} width={`${w}%`} />
        ))}
      </div>
    </>
  );
}

/** Skeleton for settings page subscription section */
export function SettingsSkeleton() {
  return (
    <div className={styles.settingsWrapper}>
      <Skeleton height={32} width={160} />
      <Skeleton height={1} width="100%" />
      <Skeleton height={16} width={180} />
      <Skeleton height={14} width={140} />
      <Skeleton height={1} width="100%" />
      <Skeleton height={16} width={120} />
      <Skeleton height={14} width={200} />
    </div>
  );
}
