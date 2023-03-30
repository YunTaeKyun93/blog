import { Post } from "@/services/posts";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import classnames from "classnames/bind";
import styles from "./post-page-carousel.module.scss";
const ss = classnames.bind(styles);
type Props = {
  post: Post;
  type: "prev" | "next";
};

export default function PostPageCarousel({
  post: { path, title, description },
  type
}: Props) {
  return (
    <Link href={`/post/${path}`} className={ss("wrapper")}>
      <div className={ss('back')}>
        <Image
          src={`/images/posts/${path}.png`}
          alt={title}
          width={400}
          height={200}
          className={ss("background-img")}
        />
        <div className={ss("content")}>
          {type === "prev" && <FaArrowLeft className={ss('arrow')} />}
          <div className={ss('title')}>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          {type === "next" && <FaArrowRight className={ss('arrow')} />}
        </div>
      </div>
    </Link>
  );
}
