"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AiFillHome, AiOutlineSetting } from "react-icons/ai";
import { BsBookmark, BsPencil, BsSearch } from "react-icons/bs";
import { BiHelpCircle, BiLogIn, BiLogOut } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { openAuthModal, closeMobileSidebar } from "@/store/slices/uiSlice";
import { signOut } from "@/lib/auth";
import styles from "./Sidebar.module.css";

const SIDEBAR_HIDDEN_PAGES = ["/choose-plan"];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((s) => s.user);
  const isMobileOpen = useAppSelector((s) => s.ui.isMobileSidebarOpen);

  if (SIDEBAR_HIDDEN_PAGES.includes(pathname)) return null;

  async function handleLogout() {
    await signOut();
    dispatch(closeMobileSidebar());
    router.push("/");
  }

  function handleLogin() {
    dispatch(closeMobileSidebar());
    dispatch(openAuthModal());
  }

  function close() {
    dispatch(closeMobileSidebar());
  }

  const sidebarContent = (
    <aside className={`${styles.sidebar} ${isMobileOpen ? styles.sidebarOpen : ""}`}>
      <div className={styles.logoWrapper}>
        <Link href="/for-you" onClick={close}>
          <Image
            src="/assets/logo.png"
            alt="Summarist"
            width={160}
            height={40}
            className={styles.logo}
          />
        </Link>
        <button className={styles.closeBtn} onClick={close}>
          <AiOutlineClose />
        </button>
      </div>

      <nav className={styles.nav}>
        {/* For you — navigable */}
        <Link
          href="/for-you"
          onClick={close}
          className={`${styles.navItem} ${pathname === "/for-you" ? styles.active : ""}`}
        >
          <AiFillHome className={styles.navIcon} />
          <span>For you</span>
        </Link>

        {/* Library — navigable */}
        <Link
          href="/library"
          onClick={close}
          className={`${styles.navItem} ${pathname === "/library" ? styles.active : ""}`}
        >
          <BsBookmark className={styles.navIcon} />
          <span>My Library</span>
        </Link>

        {/* Highlights — disabled */}
        <div className={`${styles.navItem} ${styles.disabled}`}>
          <BsPencil className={styles.navIcon} />
          <span>Highlights</span>
        </div>

        {/* Search — disabled */}
        <div className={`${styles.navItem} ${styles.disabled}`}>
          <BsSearch className={styles.navIcon} />
          <span>Search</span>
        </div>
      </nav>

      <div className={styles.bottom}>
        {/* Settings — navigable */}
        <Link
          href="/settings"
          onClick={close}
          className={`${styles.navItem} ${pathname === "/settings" ? styles.active : ""}`}
        >
          <AiOutlineSetting className={styles.navIcon} />
          <span>Settings</span>
        </Link>

        {/* Help & Support — disabled */}
        <div className={`${styles.navItem} ${styles.disabled}`}>
          <BiHelpCircle className={styles.navIcon} />
          <span>Help &amp; Support</span>
        </div>

        {/* Login / Logout */}
        {isLoggedIn ? (
          <button className={styles.navItem} onClick={handleLogout}>
            <BiLogOut className={styles.navIcon} />
            <span>Logout</span>
          </button>
        ) : (
          <button className={styles.navItem} onClick={handleLogin}>
            <BiLogIn className={styles.navIcon} />
            <span>Login</span>
          </button>
        )}
      </div>
    </aside>
  );

  return (
    <>
      {sidebarContent}
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div className={styles.backdrop} onClick={close} />
      )}
    </>
  );
}
