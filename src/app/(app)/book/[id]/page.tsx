import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BsStar } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineMic } from "react-icons/md";
import { getBookById } from "@/lib/api";
import SaveButton from "@/components/ui/SaveButton";
import styles from "./page.module.css";

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) return notFound();

  return (
    <div className={styles.page}>
      <div className={styles.topSection}>
        {/* LEFT — cover image */}
        <div className={styles.imageWrapper}>
          {book.subscriptionRequired && (
            <div className={styles.pill}>Premium</div>
          )}
          <Image
            src={book.imageLink}
            alt={book.title}
            width={300}
            height={300}
            className={styles.cover}
            unoptimized
          />
        </div>

        {/* RIGHT — book info */}
        <div className={styles.info}>
          <h1 className={styles.title}>{book.title}</h1>
          <p className={styles.author}>{book.author}</p>
          <p className={styles.subTitle}>{book.subTitle}</p>

          <div className={styles.divider} />

          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <BsStar className={styles.metaIcon} />
              <span>{book.averageRating}&nbsp;({book.totalRating} ratings)</span>
            </div>
            <div className={styles.metaItem}>
              <AiOutlineClockCircle className={styles.metaIcon} />
              <span>{book.type}</span>
            </div>
            <div className={styles.metaItem}>
              <HiOutlineLightBulb className={styles.metaIcon} />
              <span>{book.keyIdeas} Key ideas</span>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.actions}>
            <Link href={`/player/${id}`} className={styles.readBtn}>
              <MdOutlineMic size={18} />
              Read or Listen
            </Link>
            <SaveButton book={book} />
          </div>

          {book.tags && book.tags.length > 0 && (
            <div className={styles.tags}>
              {book.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM — descriptions */}
      <div className={styles.descriptions}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>What&apos;s it about?</h2>
          <p className={styles.description}>{book.bookDescription}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>About the author</h2>
          <p className={styles.description}>{book.authorDescription}</p>
        </div>
      </div>
    </div>
  );
}
