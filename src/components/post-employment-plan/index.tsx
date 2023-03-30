"use client";
import classnames from "classnames/bind";
import styles from "./post-employment-plan.module.scss";
import { useState } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import PostEmploymentContent from "@/components/post-employment-content";

const ss = classnames.bind(styles);
export default function PostEmploymentPlan() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log({ isOpen });
  };
  return (
    <div className={ss("wrapper")}>
      <div className={ss("toggle-menu")} onClick={toggleMenu}>
        <span>회사에 대한 이해와 입사 후 계획</span>
        {!isOpen && <BiDownArrow className={ss("arrow")}/>}
        {isOpen && <BiUpArrow  className={ss("arrow")}/>}
      </div>
     
      <div  className={ss(`${isOpen === true ? "visible" : "hidden"}`)}>
        <PostEmploymentContent />
      </div>
    </div>
  );
}
