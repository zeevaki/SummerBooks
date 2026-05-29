"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openAuthModal } from "@/store/slices/uiSlice";
import { Book } from "@/types/book";
import BookCard from "@/components/ui/BookCard";
import { BookCardSkeleton } from "@/components/ui/Skeleton";
import styles from "./page.module.css";

export default function LibraryPage() {
  const dispatch = useAppDispatch();
  const { isLoggedIn, uid } = useAppSelector((s) => s.user);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || !uid || !db) {
      setLoading(false);
      return;
    }

    const col = collection(db, "users", uid, "savedBooks");
    const unsubscribe = onSnapshot(col, (snap) => {
      const saved = snap.docs.map((d) => d.data() as Book);
      setBooks(saved);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isLoggedIn, uid]);

  if (!isLoggedIn) {
    return (
      <div className={styles.empty}>
        <Image
          src="/assets/login.png"
          alt="Login to see your library"
          width={300}
          height={300}
          className={styles.illustration}
        />
        <p className={styles.emptyText}>Log in to see your saved books.</p>
        <button
          className={styles.loginBtn}
          onClick={() => dispatch(openAuthModal())}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>My Library</h1>

      {loading ? (
        <div className={styles.grid}>
          {Array.from({ length: 4 }).map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>
      ) : books.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>
            Your library is empty. Save books from their detail page to see them here.
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
