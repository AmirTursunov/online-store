import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

// ✅ Google tasdiqlash kodi shu yerga qo‘shildi
export const metadata: Metadata = {
  title: "GreenShop",
  description: "Beautiful plant shop",
  verification: {
    google: "64tmh_077tfypHwpJseyiK8AQE8qFAOR8qqnefn80zY",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={poppins.variable}>
        <body className="font-poppins">{children}</body>
      </html>
    </ClerkProvider>
  );
}
