import classnames from "classnames/bind";
import styles from "./page.module.scss";

import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { IoLogoVercel } from "react-icons/io5";
import ContactForm from "@/components/contact-form";

const ss = classnames.bind(styles);
export default function ContactPage() {
  return (
    <div className={ss('wrapper')}>
      <div className={ss('container')}>
        <h1>Contact me</h1>
        <ContactForm />
      </div>
    </div>
  );
}
