import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/layout/ReduxProvider";
import AuthProvider from "@/components/layout/AuthProvider";
import GlobalModals from "@/components/layout/GlobalModals";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Summarist",
  description: "Gain more knowledge in less time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <ReduxProvider>
          <AuthProvider>
            {children}
            <GlobalModals />
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
