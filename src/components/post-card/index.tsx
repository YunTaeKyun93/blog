import { Post } from "@/services/posts";
import Link from "next/link";
import Image from "next/image";
import classnames from "classnames/bind";
import styles from "./post-card.module.scss";
const ss = classnames.bind(styles);
type Props = { post: Post };
export default function PostCard({
  post: { title, description, date, category, path }
}: Props) {
  return (
    <div className={ss("card-container")}>
      <Link href={`/post/${path}`} className={ss("card")}>
        <Image
          className={ss("card-image")}
          src={`/images/posts/${path}.png`}
          alt={title}
          width={400}
          height={300}
        />
        <div className={ss("card-content")}>
          <h3>{title}</h3>
          <time>{date.toString()}</time>

          <p>{description}</p>
          <span className={ss("content-category")}>{category}</span>
        </div>
      </Link>
    </div>
  );
}
