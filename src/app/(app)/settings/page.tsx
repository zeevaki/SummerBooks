"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { openAuthModal } from "@/store/slices/uiSlice";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/Skeleton";
import styles from "./page.module.css";

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoggedIn, email, isGuest } = useAppSelector((s) => s.user);

  const [plan, setPlan] = useState<string | null>(null);
  const [planLoading, setPlanLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn || !email) return;
    setPlanLoading(true);
    fetch(`/api/subscription?email=${encodeURIComponent(email)}`)
      .then((r) => r.json())
      .then((data) => setPlan(data.plan ?? null))
      .catch(() => setPlan(null))
      .finally(() => setPlanLoading(false));
  }, [isLoggedIn, email]);

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  if (!isLoggedIn) {
    return (
      <div className={styles.loggedOut}>
        <Image
          src="/assets/login.png"
          alt="Login to see your details"
          width={300}
          height={300}
          className={styles.illustration}
        />
        <p className={styles.loggedOutText}>
          Log in to your account to see your details.
        </p>
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
      <h1 className={styles.title}>Settings</h1>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Your Subscription Plan</h2>
        {planLoading ? (
          <Skeleton height={16} width={120} />
        ) : (
          <p className={styles.planName}>
            {isGuest ? "Basic" : plan ?? "Basic"}
          </p>
        )}
        {!plan && !isGuest && !planLoading && (
          <Link href="/choose-plan" className={styles.upgradeBtn}>
            Upgrade to Premium
          </Link>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Email</h2>
        <p className={styles.emailValue}>{email ?? "Guest Account"}</p>
      </div>

      <div className={styles.divider} />

      <button className={styles.signOutBtn} onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
}
