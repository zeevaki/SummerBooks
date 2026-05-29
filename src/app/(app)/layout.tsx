import Sidebar from "@/components/layout/Sidebar";
import AuthGuard from "@/components/layout/AuthGuard";
import TopBar from "@/components/layout/TopBar";
import styles from "./app.module.css";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className={styles.appShell}>
        <Sidebar />
        <div className={styles.appContent}>
          <TopBar />
          {children}
        </div>
      </div>
    </AuthGuard>
  );
}
