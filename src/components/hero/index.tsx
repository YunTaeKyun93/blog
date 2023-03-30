import Image from "next/image";
import profileImage from "../../../public/images/profile2.jpg";

import classnames from "classnames/bind";
import styles from "./hero.module.scss";
import Link from "next/link";
const ss = classnames.bind(styles);

export default function Hero() {
  return (
    <div className={ss('wrapper')}>
      <Image src={profileImage} alt="profileImage" width={400} height={400} className={ss('profile-image')} priority />
      <h2>{"Hi, I'm TaeKyun"}</h2>
      <p>항상 즐기면서 최선을 다해보자</p>
      <Link className={ss('contact-button')}href="/contact">Contact Me</Link>
    </div>
  );
}
