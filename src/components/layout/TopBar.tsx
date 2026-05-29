"use client";

import { usePathname } from "next/navigation";
import { RiMenuLine } from "react-icons/ri";
import { useAppDispatch } from "@/store/hooks";
import { openMobileSidebar } from "@/store/slices/uiSlice";
import SearchBar from "@/components/ui/SearchBar";
import styles from "./TopBar.module.css";

const HIDDEN_ON = ["/choose-plan"];

export default function TopBar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <header className={styles.topBar}>
      <button
        className={styles.hamburger}
        onClick={() => dispatch(openMobileSidebar())}
        aria-label="Open menu"
      >
        <RiMenuLine />
      </button>
      <SearchBar />
    </header>
  );
}
