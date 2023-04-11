"use client";
import Image from "next/image";
import CursorSelector from "../cursor-selector";
import React, { useState, useEffect } from "react";
import classnames from "classnames/bind";
import styles from "./cursor-menu.module.scss";
export type Cursor =
  | "cursor0"
  | "cursor1"
  | "cursor2"
  | "cursor3"
  | "cursor4"
  | "cursor5";

const cursors: Cursor[] = [
  "cursor0",
  "cursor1",
  "cursor2",
  "cursor3",
  "cursor4",
  "cursor5"
];

export default function CursorMenu() {
  const ss = classnames.bind(styles);
  const [selectedCurosor, setSelectedCursor] = useState<Cursor>("cursor1");
  const [cursorPosition, setCursorPosition] = useState([0, 0]);
  useEffect(() => {
    const event = ({ clientX, clientY }: MouseEvent) => {
      setCursorPosition([clientX, clientY]);
    };
    window.addEventListener("mousemove", event);
    return () => window.removeEventListener("mousemove", event);
  }, [selectedCurosor]);

  return (
    <>
      <Image
        src={`/images/cursor/${selectedCurosor}.png`}
        width={30}
        height={30}
        alt={selectedCurosor}
        style={{
          position: "fixed",
          left: cursorPosition[0],
          top: cursorPosition[1],
          pointerEvents: "none"
        }}
      />
      <div
      className={ss('wrapper')}
      >
        {cursors.map((cursor) => (
          <CursorSelector
            name={cursor}
            key={cursor}
            onClick={() => {
              setSelectedCursor(cursor);
            }}
            selected={selectedCurosor === cursor}
          />
        ))}
      </div>
    </>
  );
}
