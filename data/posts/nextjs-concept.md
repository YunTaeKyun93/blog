# Next.js 주요 개념 정리

## 1. What’s Next.js
React Framework for the web 
React UI를 만들 수 있는 자바스크립트 라이브러리 컴포넌트 단위로 사용 (SPA) CSR 

Next.js는 라이브러리가 아닌 프레임워크  큰 단위의 솔루션을 제공해주는 툴 

Full-Stack, File-based-routing, {SEO, Image, Font} Optimazation

리액트로 웹앱을 개발하는데 리액트 만으로는 힘든 많은것들을 가능하게 해줌.


## 2. Histroy of Next.js
2016년 github로 배포 Vercel사에서 만듦

open-source web development framework

React-based web app 

SSR SSG 이외에도 하이브리드 렌더링도 가능

##### Next.js 의 6가지 원칙
1. out-of-the-box functionality requiring no setup : 복잡한 설정 없이 프레임워크 사용하기 쉬울 것
2. JavaScript everywhere : 자바스크립트 만으로 한 프로젝트 안에 풀스택 가능할 것
3. automatic code-splitting and server-rendering : 개발자들이 신경  안 써도 code-spltting , server-rendering 가능 할 것
4. configureable data-fetching : 데이터 페칭을 설정 가능하게 할 것
5. anticipating requests : 요청 상황을 예측 가능하게 만들 것
6. simplifying deployment: 배포를 손쉽게 만들겠다.

## 3. Client Side Rendering

렌더링 하는 주체자가 클리이언트(브라우저)

클라이언트가 서버로부터 리액트 소스 html js코드를 요청 한 후 다운 받아서 클라이언트 측에서 돔 요소로 표기 하는 것.
#### 장점:
1. 한 번만 로딩 되면, 빠른 UX 제공 ( 부분적으로만 업데이트) 페이지 이동 없이 한 페이지 내에서 어플리케이션 사용
2. 부분적으로 업데이트가 되니 서버의 부하가 적음

### 단점:

1. TTV(time to view)가 길다 페이지 로딩 시간이 길다 FCP(first contentful paint)
2. 자바스크립트 활성화 필수 
3. SEO 최적화가 힘듦 
4. 보안에 취약함(클라이언트에서 노출이 되므로)
5. CDN 캐시가 안됨  
- CDN(Content Delivery Network) 예를 들어 멀리 있는 국가에 네트워크를 접속하게 된다면 오래 걸리기에 근접 국가에서 들고 오는 것



## 4. Static Site Generation

CSR 단점이 있으니 배포할 때는 정적으로 하는 게 어떨까 ??

렌더링 하는 주체자가 서버, 

언제 렌더링 되냐?  배포하고 처음으로 빌드 할 때 렌더링 (정적인 사이트를 만드는 것)

서버에서 미리 만들어 놓고 클라이언트가 요청하면 전달

#### 장점:
1. TTV(time to view)가 빠름 
2. 자바스크립트가 필요 없음
3. SEO 최적화가 좋음
4. 보안이 뛰어남
5. CDN에 캐시가 됨

### 단점:

1. 빌드 할 때 렌더링 하니까 데이터가 정적임
2. 사용자 별 정보 제공의 어려움

**모든 사용자가 정적으로 제공하는 데이터를 필요 할 때는 좋다**


## 5. Incremental Static Regeneration

렌더링 하는 주체자가 서버

언제 렌더링 하냐? 주기적으로 렌더링

#### 장점:
1. TTV(time to view)가 빠름 
2. 자바스크립트가 필요 없음
3. SEO 최적화가 좋음
4. 보안이 뛰어남
5. CDN에 캐시가 됨
6. 데이터가 주기적으로 업데이트 됨

### 단점:

1. 실시간 데이터가 아님 (revalidate등 으로 정해진 시간에 주기적으로 업데이트)
2. 사용자 별 정보 제공의 어려움

**이런 문제점을 해결하기 위해 나온 게 SSR**
CSR ⇒ 사용하다가 

SSG/ISR 이 나왔지만, 이를 개선 하기 위해 SSR


## 6. Server Side Rendering
렌더링 하는 주체자가 서버

 언제 렌더링 하냐? 요청 시 렌더링

pre-rendering 된 정적인 html 을 먼저 보여줌

viewable ⇒ interactable 시간 줄이는 게 중요

#### 장점:

1. TTV(time to view)가 빠름 
2. 자바스크립트가 필요 없음
3. SEO 최적화가 좋음
4. 보안이 뛰어남
5. 실시간 데이터를 사용
6. 사용자 별 필요한 데이터를 사용함

### 단점:

1. 비교적 느릴 수 있음
2. 서버에 과부하가 걸릴 수 있음(Overhead)
3. CDN에 캐시가 안됨

## 7. Next.js for Hybrid Web app
두 개 이상 기능이나 요소를 결합 (CSR, SSG, ISR, SSR)

페이지 별로 한 개 혹은 두 개 이상의 렌더링 방식으로 만들 수 있음.

## 8. Hydration for interaction

최초에 클라이언트가 서버에 요청을 하면 pre-rendering 된 정적인 HTML 페이지를 먼저 보여주고, 

클라이언트에서 React, js 코드를 다운 받은 후 컴포넌트 렌더링을 하여 정적인 페이지 대신 실제 컴포넌트를 사용할 수 있음


## 9. Web App 개발 시 중요한 포인트
TTV(time to view)

TTI(Time to interact)

React (CSR) : SEO이슈 TTV이슈

SSR 일단 pre-rendering(정적인 html) 하이드레이션을 통해 js를 다운받은 뒤 동적인 이벤트를 발생 
단점으로 느려서 Next.js Ver13에서는 페이지 별로 나누는게 아닌 컴포넌트 별로 렌더링 방식을 바꾸자!!