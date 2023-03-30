import getPostData from "@/services/get-post-data";
import MarkdownViewer from "./../../../components/markdown-viewer/index";
import classnames from "classnames/bind";
import styles from "./page.module.scss";
import "/public/static/fonts/style.css";
import PostContent from "@/components/post-content/index";
import PostPageCarousel from "./../../../components/post-page-carousel/index";

type Props = {
  params: {
    slug: string;
  };
};
const ss = classnames.bind(styles);
export default async function PostPage({ params: { slug } }: Props) {
  const post = await getPostData(slug);
  const { title, path, content, next, prev } = post;

  return (
    <div className={ss("wrapper")}>
      <div className={ss("post-container")}>
        <PostContent post={post} />
        <MarkdownViewer content={content} />
        <div className={ss("border")}></div>
        <div className={ss("post-carousel")}>
          {prev && <PostPageCarousel post={prev} type="prev" />}
          {next && <PostPageCarousel post={next} type="next" />}
        </div>
      </div>
    </div>
  );
}
