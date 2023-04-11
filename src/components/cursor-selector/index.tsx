import Image from "next/image";
import classnames from "classnames/bind";
import styles from "./cursor-slector.module.scss";
type ButtonProps = {
  selected?: boolean;
  name: string;
  onClick: () => void;
};
export default function CursorSelector({
  selected,
  name,
  onClick
}: ButtonProps) {
  const ss = classnames.bind(styles);

  return (
    <div
      onClick={onClick}
      className={ss("cursor-item")}
      style={{
        boxShadow: `0 0 0 ${selected ? "6" : "1"}px black inset`
      }}
    >
      <Image
        src={`/images/cursor/${name}.png`}
        alt={name}
        width={25}
        height={25}
      />
    </div>
  );
}
