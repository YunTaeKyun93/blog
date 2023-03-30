"use client";
import classnames from "classnames/bind";
import styles from "./category-menu.module.scss";
import '../../../public/static/fonts/style.css';
const ss = classnames.bind(styles);
type Props = {
  categories: string[];
  selected: string;
  onClick: (category: string) => void;
};
export default function CategoryMenu({ categories, selected, onClick }: Props) {
  return (
    <div className={ss("wrapper")}>
      <span>Category</span>
      <ul>
        {categories.map((category) => (
          <li key={category} onClick={() => onClick(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
