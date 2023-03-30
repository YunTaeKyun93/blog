# 성능 개선에 관하여

## Next.js Doc 中
>새 앱 라우터는 이라는 새 디렉터리에서 작동합니다 'app'. 디렉터리 는 점진적 채택을 허용하기 위해 디렉터리 'app'와 함께 작동합니다 . 'pages'이를 통해 애플리케이션의 일부 경로를 새 동작으로 선택하고 다른 경로는 'pages'이전 동작을 위해 디렉터리에 유지할 수 있습니다.

>Next.js는 중첩된 경로에서 특정 동작으로 UI를 생성하기 위한 특수 파일 집합을 제공합니다.
- page.js
    * 경로의 고유한 UI를 만들고 경로에 공개적으로 액세스할 수 있도록 합니다.

- route.js
    * 경로에 대한 서버 측 API 엔드포인트를 생성합니다(next@canary에서 사용 가능).

- layout.js
    * 세그먼트 및 해당 하위에 대한 공유 UI를 생성합니다. 레이아웃은 페이지 또는 하위 세그먼트를 래핑합니다.

- templage.js
    * 새 컴포넌트 인스턴스가 탐색에 마운트된다는 점을 제외하면 와 유사합니다. 이 동작이 필요하지 않으면 레이아웃을 사용하십시오.

- loading.js
    * 세그먼트 및 해당 하위에 대한 로딩 UI를 생성합니다. [React Suspense Boundary](https://beta.reactjs.org/apis/react/Suspense#suspense)
에서 페이지 또는 하위 세그먼트를 래핑하여로드하는 동안 로딩 UI를 표시합니다.

- error.js
    * 세그먼트 및 하위 항목에 대한 오류 UI를 만듭니다. [React Error Boundary](https://reactjs.org/docs/error-boundaries.html)
에서 페이지 또는 하위 세그먼트를 래핑하여오류가 발견되면 오류 UI를 표시합니다.

## loading.js
필요한 route폴더 하위에 Spinner나 로딩 중 보여줄 UI를 만들면 끝 
/app/product/loading.tsx
```ts
const ProductsLoading = ()=>{
    return (
            <div>Loading....!(づ￣ 3￣)づ</div>

    )
}
export default ProductsLoading
```
확인을 위해 dev모드로 확인을 하여 pre-rendering된 것을 보면 잘나온다.
![loading devmode](/public/images/post-contents/loading-devmode.png)
그렇지만 기본적으로 dev모드는 SSR로 렌더링이 되므로 loading은 의미가 없고, yarn build 후 start를 하면 SSG가 되므로, 의미가 없다.

loading은 동적으로 보여질 SSR로 만들 때 필요하다.

## error.js
파일 규칙을 사용하면 중첩된 경로error.js 에서 런타임 오류를 정상적으로 처리할 수 있습니다 .

React Error Boundary 에서 경로 세그먼트와 중첩된 자식을 자동으로 래핑합니다 .
세분성을 조정하기 위해 파일 시스템 계층 구조를 사용하여 특정 세그먼트에 맞는 오류 UI를 만듭니다.
나머지 앱 기능을 유지하면서 영향을 받는 세그먼트에 대한 오류를 격리합니다.
전체 페이지를 다시 로드하지 않고 오류 복구를 시도하는 기능을 추가합니다.
error.js경로 세그먼트 내에 파일을 추가하고 React 구성 요소를 내보내서 오류 UI를 만듭니다 .

/app /dashboard/error.ts
해당 라우트 폴더 하위에 error.ts를 생성 한 뒤
```ts
"use client"; // Error components must be Client components 당연히 CSR에서 발생 할 문제
import { useEffect } from "react";
type Props = {
  error: Error;
  reset: () => void;
};
export default function ProductPageError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

```

- error와 reset을 Props로 받은 뒤 발생하는 에러처리도 가능하다.

중첩 경로 즉 하위 폴더에서 에러가 발생하였는데, error가 없다면 상위 폴더로 버블링이 된다 

## layout.js

공용 layout 생성 시
/src/layout.js

```ts
import { Metadata } from "next";
import styles from "./layout.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "멋진 제품사이트",
  description: "멋진 제품을 판매하는 사이트",
  icons:{
    icon:'/favicon.ico'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className={styles.header}>
          <h1>Demo Note App</h1>
          <nav className={styles.nav}>
            <Link href="/contact">Contact</Link>
            <Link href="/about">About</Link>
            <Link href="/product">Products</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
```

page 별 layout 생성 시(html태그 필요 없음..)
/products / layout.js

```js
import { Metadata } from "next";
import styles from "./layout.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "멋진 제품사이트",
  description: "멋진 제품을 판매하는 사이트",
  icons:{
    icon:'/favicon.ico'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className={styles.header}>
          <h1>Demo Note App</h1>
          <nav className={styles.nav}>
            <Link href="/contact">Contact</Link>
            <Link href="/about">About</Link>
            <Link href="/product">Products</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
```
##  Head.js 대신 Metadata
**참고:** 에 도입된 메타데이터를 통한 기본 제공 SEO 지원은 `13.2`이전 `head.js`구현을 대체합니다. 특수 `[head.js`파일은](https://beta.nextjs.org/docs/api-reference/file-conventions/head)`13.2` 향후 버전에서 더 이상 사용되지 않으며 제거되었습니다. [마이그레이션 가이드](https://beta.nextjs.org/docs/api-reference/file-conventions/head#migration-guide) 보기 .

이후 사용할 Metadata는 다양한 정보를 Header에 담아서 보내줄 수 있다.
https://beta.nextjs.org/docs/api-reference/metadata