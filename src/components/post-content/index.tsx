import Image from "next/image";
import { AiTwotoneCalendar } from "react-icons/ai";
import { PostData } from "@/services/get-post-data";
import classnames from "classnames/bind";
import styles from "./post-content.module.scss";

const ss = classnames.bind(styles);

export default function PostContent({ post }: { post: PostData }) {
  const { title, description, date, path, content } = post;
  return (
    <div className={ss("post-card")}>
      <div className={ss('image-container')}>
      <Image
        className={ss("post-img")}
        src={`/images/posts/${path}.png`}
        alt={title}
        width={700}
        height={420}
        layout="responsive"
      />
</div>
      <div className={ss("post-date")}>
        <AiTwotoneCalendar />
        <p>{date.toString()}</p>
      </div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
