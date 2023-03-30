"use client";
import classnames from "classnames/bind";
import styles from "./solution-experience.module.scss";
import { useState } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import SolutionContent from "./../solution-content/index";

const ss = classnames.bind(styles);
export default function SolutionExperience() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log({ isOpen });
  };
  return (
    <div className={ss("wrapper")}>
      <div className={ss("toggle-menu")} onClick={toggleMenu}>
        <span>문제해결 경험</span>
        {!isOpen && <BiDownArrow className={ss("arrow")}/>}
        {isOpen && <BiUpArrow  className={ss("arrow")}/>}
      </div>
     
      <div  className={ss(`${isOpen === true ? "visible" : "hidden"}`)}>
        <SolutionContent />
      </div>
    </div>
  );
}
