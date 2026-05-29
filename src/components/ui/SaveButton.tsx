"use client";

import { useEffect, useState } from "react";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { db } from "@/lib/firebase";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { openAuthModal } from "@/store/slices/uiSlice";
import { Book } from "@/types/book";
import styles from "./SaveButton.module.css";

interface SaveButtonProps {
  book: Book;
}

export default function SaveButton({ book }: SaveButtonProps) {
  const dispatch = useAppDispatch();
  const { uid, isLoggedIn } = useAppSelector((s) => s.user);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!uid || !isLoggedIn || !db) return;
    const ref = doc(db, "users", uid, "savedBooks", book.id);
    getDoc(ref).then((snap) => setIsSaved(snap.exists()));
  }, [uid, isLoggedIn, book.id]);

  async function toggleSave() {
    if (!isLoggedIn || !uid) {
      dispatch(openAuthModal());
      return;
    }
    if (!db) return;
    setLoading(true);
    const ref = doc(db, "users", uid, "savedBooks", book.id);
    try {
      if (isSaved) {
        await deleteDoc(ref);
        setIsSaved(false);
      } else {
        await setDoc(ref, {
          id: book.id,
          title: book.title,
          author: book.author,
          subTitle: book.subTitle,
          imageLink: book.imageLink,
          audioLink: book.audioLink,
          averageRating: book.averageRating,
          totalRating: book.totalRating,
          subscriptionRequired: book.subscriptionRequired,
          type: book.type,
          status: book.status,
          duration: book.duration ?? null,
          savedAt: new Date().toISOString(),
        });
        setIsSaved(true);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      className={`${styles.btn} ${isSaved ? styles.saved : ""}`}
      onClick={toggleSave}
      disabled={loading}
    >
      {isSaved ? <BsBookmarkFill size={16} /> : <BsBookmark size={16} />}
      {isSaved ? "Saved to Library" : "Add to My Library"}
    </button>
  );
}
