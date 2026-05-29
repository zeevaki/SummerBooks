"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineClose, AiOutlineUser } from "react-icons/ai";
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  loginAsGuest,
  forgotPassword,
} from "@/lib/auth";
import styles from "./AuthModal.module.css";

type View = "login" | "register" | "forgot-password";

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const router = useRouter();
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  function handleSuccess() {
    onClose();
    router.push("/for-you");
  }

  function switchView(v: View) {
    setError("");
    setSuccessMsg("");
    setEmail("");
    setPassword("");
    setView(v);
  }

  async function handleEmailAuth() {
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    try {
      if (view === "login") await loginWithEmail(email, password);
      else await registerWithEmail(email, password);
      handleSuccess();
    } catch (err: unknown) {
      setError(parseFirebaseError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      handleSuccess();
    } catch (err: unknown) {
      setError(parseFirebaseError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleGuest() {
    setError("");
    setLoading(true);
    try {
      await loginAsGuest();
      handleSuccess();
    } catch (err: unknown) {
      setError(parseFirebaseError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    setError("");
    if (!email) { setError("Please enter your email address."); return; }
    setLoading(true);
    try {
      await forgotPassword(email);
      setSuccessMsg("Password reset email sent! Check your inbox.");
    } catch (err: unknown) {
      setError(parseFirebaseError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <AiOutlineClose />
        </button>

        {/* ── Forgot password view ── */}
        {view === "forgot-password" ? (
          <>
            <div className={styles.body}>
              <h2 className={styles.title}>Reset your password</h2>
              <input
                className={styles.input}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className={styles.error}>{error}</p>}
              {successMsg && <p className={styles.success}>{successMsg}</p>}
              <button className={styles.submitBtn} onClick={handleForgotPassword} disabled={loading}>
                {loading ? "Sending..." : "Send reset email"}
              </button>
            </div>
            <div className={styles.footer} onClick={() => switchView("login")}>
              Go back to Login
            </div>
          </>
        ) : view === "login" ? (
          /* ── Login view ── */
          <>
            <div className={styles.body}>
              <h2 className={styles.title}>Log in to Summarist</h2>

              <button className={styles.blueBtn} onClick={handleGuest} disabled={loading}>
                <AiOutlineUser size={18} />
                Login as a Guest
              </button>

              <div className={styles.divider}><span>or</span></div>

              <button className={styles.blueBtn} onClick={handleGoogle} disabled={loading}>
                <FcGoogle size={20} />
                Login with Google
              </button>

              <div className={styles.divider}><span>or</span></div>

              <input
                className={styles.input}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEmailAuth()}
              />
              {error && <p className={styles.error}>{error}</p>}

              <button className={styles.submitBtn} onClick={handleEmailAuth} disabled={loading}>
                {loading ? "Please wait..." : "Login"}
              </button>

              <p className={styles.forgotLink} onClick={() => switchView("forgot-password")}>
                Forgot your password?
              </p>
            </div>
            <div className={styles.footer} onClick={() => switchView("register")}>
              Don&apos;t have an account?
            </div>
          </>
        ) : (
          /* ── Register view ── */
          <>
            <div className={styles.body}>
              <h2 className={styles.title}>Sign up to Summarist</h2>

              <button className={styles.blueBtn} onClick={handleGoogle} disabled={loading}>
                <FcGoogle size={20} />
                Sign up with Google
              </button>

              <div className={styles.divider}><span>or</span></div>

              <input
                className={styles.input}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEmailAuth()}
              />
              {error && <p className={styles.error}>{error}</p>}

              <button className={styles.submitBtn} onClick={handleEmailAuth} disabled={loading}>
                {loading ? "Please wait..." : "Sign up"}
              </button>
            </div>
            <div className={styles.footer} onClick={() => switchView("login")}>
              Already have an account?
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function parseFirebaseError(err: unknown): string {
  if (err && typeof err === "object" && "code" in err) {
    const code = (err as { code: string }).code;
    const messages: Record<string, string> = {
      "auth/user-not-found": "No account found with this email.",
      "auth/wrong-password": "Incorrect password. Please try again.",
      "auth/invalid-credential": "Invalid email or password.",
      "auth/email-already-in-use": "An account with this email already exists.",
      "auth/weak-password": "Password must be at least 6 characters.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/too-many-requests": "Too many attempts. Please try again later.",
      "auth/popup-closed-by-user": "Sign-in popup was closed.",
      "auth/operation-not-allowed": "This sign-in method is not enabled in Firebase.",
    };
    return messages[code] ?? "Something went wrong. Please try again.";
  }
  return "Something went wrong. Please try again.";
}
