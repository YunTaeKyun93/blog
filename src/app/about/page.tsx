import classnames from "classnames/bind";
import styles from "./about.module.scss";
import Hero from "@/components/hero/index";
import SolutionExperience from "@/components/solution-experience/index";
import PostEmploymentPlan from "./../../components/post-employment-plan/index";
const ss = classnames.bind(styles);
export default function AboutPage() {
  return (
    <div className={ss("wrapper")}>
      <div className={ss("container")}>
        <Hero />
        <div className={ss("about-content")}>
          <div className={ss("introduction")}>
            <h2>안녕하세요!</h2>
            <h2>고객문제해결경험이 많은 개발자,</h2>
            <h2>윤태균입니다.</h2>
            <p>Email: ytk5495@gmail.com</p>
            <p>Phone: 010-5594-4641</p>
            <p>Github: https://github.com/YunTaeKyun93?tab=repositories</p>
            <p>Blog: https://asdf.com</p>
          </div>
          <div className={ss("border")}></div>
          <div className={ss("self-introduction")}>
            <h3>자기소개</h3>
            <ul>
              <li>
                고객 니즈에 대한 중요성을 잘 알고 있으며, 고객 경험이 많음
              </li>
              <li>
                문제를 다룰 때 끊임없이 생각하고, 다양한 조사와 깊은 고찰을 함
              </li>
              <li>
                문제가 발생하면 꼭 나에게 직접적인 영향이 있지 않다 하더라도
                해결하려고 하고, 책임감을 중시함
              </li>
              <li>
                이러한 장점을 통해 여러 개발 경험을 쌓을 수 있는 곳을 찾고 있음
              </li>
            </ul>
          </div>
          <div className={ss("skill")}>
            <h3>보유 기술</h3>
            <ul>
              <li>핵심 기술: React, Next JS, Styled-components, Scss</li>
              <li>부가 기술: Node JS, MongoDB</li>
              <li>
                희망 직무: 웹 프론트엔드, 앱 프론트엔드(React Native 또는 다른
                프레임워크)
              </li>
            </ul>
            <h3>
              역량: 여러 페이지로 구성된 간단한 홈페이지를 혼자서 만들 수 있음
            </h3>
            <ul>
              <li>
                상태를 API를 통해서 로딩하고, 프론트엔드에서 조작하는 등의 React
                상태관리 가능
              </li>
              <li>API를 호출할 수 있음</li>
              <li>여러 페이지를 React Router 또는 Next JS로 관리 가능</li>
              <li>여러 프론트엔드 서비스를 별도로 분리하여 코드 작성 가능</li>
              <li>간단한 Node JS, Express, Mongo DB 등을 다룰 수 있음</li>
            </ul>
          </div>
          <div className={ss('toggle-menu')}>
            <SolutionExperience />
            <PostEmploymentPlan />
          </div>
        </div>
      </div>
    </div>
  );
}
