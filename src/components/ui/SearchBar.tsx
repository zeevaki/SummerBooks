"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsSearch } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Book } from "@/types/book";
import styles from "./SearchBar.module.css";

const BASE_URL = "https://us-central1-summaristt.cloudfunctions.net";

export default function SearchBar() {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setOpen(true);
      try {
        const res = await fetch(
          `${BASE_URL}/getBooksByAuthorOrTitle?search=${encodeURIComponent(query.trim())}`
        );
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(id: string) {
    setQuery("");
    setResults([]);
    setOpen(false);
    router.push(`/book/${id}`);
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search for books"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
        />
        {loading ? (
          <AiOutlineLoading3Quarters className={`${styles.icon} ${styles.spin}`} />
        ) : (
          <BsSearch className={styles.icon} />
        )}
      </div>

      {open && (
        <div className={styles.dropdown}>
          {results.length === 0 && !loading && (
            <p className={styles.noResults}>No books found for &quot;{query}&quot;</p>
          )}
          {results.map((book) => (
            <button
              key={book.id}
              className={styles.result}
              onClick={() => handleSelect(book.id)}
            >
              <Image
                src={book.imageLink}
                alt={book.title}
                width={40}
                height={48}
                className={styles.cover}
                unoptimized
              />
              <div className={styles.info}>
                <p className={styles.resultTitle}>{book.title}</p>
                <p className={styles.resultAuthor}>{book.author}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
