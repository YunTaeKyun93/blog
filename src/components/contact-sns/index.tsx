import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { IoLogoVercel } from "react-icons/io5";
import classnames from "classnames/bind";
import styles from "./contact-sns.module.scss";
const ss = classnames.bind(styles);

export default function ContactSns (){
    return (
        <div className={ss("menu", "sns-menu")}>
        <a target="_blank" href="https://github.com/YunTaeKyun93?tab=repositories">
          <AiFillGithub />
          <div className={ss("tooltip")}>GitHub</div>
        </a>
        <a target="_blank" href="https://www.instagram.com/iaelc99/">
          <AiFillInstagram />
          <div className={ss("tooltip")}>Instagram</div>
        </a>
        <a target="_blank" href="https://vercel.com/yuntaekyun93/blog/">
          <IoLogoVercel />
          <div className={ss("tooltip")}>Versel</div>
        </a>
      </div>
    )
}