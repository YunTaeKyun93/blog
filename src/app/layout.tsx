import Link from "next/link";
import { Metadata } from "next";
import { Oswald } from "next/font/google";
import classnames from "classnames/bind";
import styles from "./layout.module.scss";
import Header from '@/components/header/index';
import '../../public/static/fonts/style.css';
const oswald = Oswald({
  subsets: ["latin"],
  weight: "700"
});
export const metadata: Metadata = {
  title: "HoneyBadger's Blog",
  description: "Next.js를 공부하며ლ(╹◡╹ლ)",
  icons: {
    icon: "/favicon.png"
  }
};
const ss = classnames.bind(styles);
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={ss('wrapper')}>
        <div className={ss('container')}>
       <Header/>
        {children}
        </div>
      </body>
    </html>
  );
}
