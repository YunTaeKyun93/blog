import Link from "next/link";

import { Oswald,Open_Sans } from "next/font/google";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { IoLogoVercel } from "react-icons/io5";
import classnames from "classnames/bind";
import styles from "./header.module.scss";
import ContactSns from '@/components/contact-sns';
const oswald = Oswald({
  subsets: ["latin"],
  weight: "700"
});
const sans = Open_Sans({
    subsets: ["latin"],
    weight: "400"
})
const ss = classnames.bind(styles);

export default function Header() {

  return (
    <header className={ss("wrapper")}>
      <div className={ss("header-container")}>
        <div className={ss("logo-container")}>
          <Link href="/" className={ss("logo")}>
            <h1 className={`${oswald.className}`}>HoneyBadger`s Blog</h1>
          </Link>
          <h4>안녕하세요! 고객문제해결경험이 많은 개발자</h4>
        </div>

        <nav className={ss("menu-container", `${sans.className}`)}>
          <Link className={ss("menu", "menu1")} href="/">
            Home
          </Link>
          <Link className={ss("menu")} href="/contact">
            Contact
          </Link>
          <Link className={ss("menu", "menu2")} href="/about">
            About
          </Link>
          <Link className={ss("menu")} href="/post">
            Post
          </Link>

    <ContactSns/>
        </nav>
      </div>
    </header>
  );
}
