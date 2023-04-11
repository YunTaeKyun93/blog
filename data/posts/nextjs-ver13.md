# Rendering Ver 12 / Ver 13

## 1. Ver12 vs Ver13
Ver12 : 페이지 단위로 렌더링 방식을 규정

getStaticProps( ) = SSG

getServerSideProps( ) = SSR


Ver13 : 서버 컴포넌트,  클라이언트 컴포넌트 생김

컴포넌트 단위로 렌더링 방식을 규정

/app 컴포넌트는 기본적으로 서버렌더링 방식
![rendering](/images/post-contents/rendering-ver12-ver13.png)

### 서버컴포넌트

서버에서 실행이 되는 컴포넌트!

서버에서 실행이 되어서 프리렌더링이 된 HTML 을 클라이언트에 전송이 되므로 브라우저에서는 실행이 되지 않는다.

(ex: 콘솔로그를 찍어도 브라우저는 X 터미널에 찍힘)

서버에서 동작하기 때문에 서버 컴포넌트 내의 코드는 브라우저 내 API사용 불가 NODE API는 사용 가능

브라우저에 필요한 상태 관리는 불가!(local stroage, useState)

```ts
import {useState} from 'react';

//에러 발생 "useState" is not allowed in Server Components.ts(71001)
```

### 클라이언트 컴포넌트
```ts
'use client';// 클라이언트 컴포넌트를 사용 하겠음.
import React,{useState} from 'react'; 

const Counter = () => {
    const [count,setCount] = useState(0);
    console.log('hello Client')
  return (
    <div>
        <p>{count}</p>
        <button onClick={()=>setCount(num=>num+1)}>Increase</button>
    </div>
  )
}

export default Counter
```

근데 클라이언트 컴포넌트 라고 해서 무조건 클라이언트 사이드 렌더링 되는 게 아니라 정적인 요소는 미리 만들어준다

(p태그와 버튼 태그 )

그렇지만 이벤트는 발생하지 않는다 

(클릭 시 아무 이벤트 발생 X)

이벤트를 발생하려면 하이드레이션이 일어나야 한다.

**하이드레이션(hydration)

렌더링 한 페이지에 스크립트 코드를 집어 넣어서 나중에 웹

페이지를 동적으로 처리할 수도 있음

## Ver13

### SSG 렌더링
파일 구조가 data / product.json 라는 데이터가 존재하고 만약 이를 SSG방식 즉 빌드 할 때 렌더링 하고자 한다면
```js
[
  {
    "id": "1234",
    "name": "청바지",
    "price": 5000
  },
  {
    "id": "1235",
    "name": "티셔츠",
    "price": 5000
  },
  {
    "id": "1236",
    "name": "부츠",
    "price": 5000
  }
]
```

src / sevices / products 

``` js

import path from "path";
import { promises as fs } from "fs";
export type Product = {
  id: string;
  name: string;
  price: number;
};
export async function getProducts(): Promise<Product[]> {  //Promise를 리턴 하므로 
  const filePath = path.join(process.cwd(), "data", "products.json"); //현재 경로를 합치기 위해 
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
 }

export async function getProduct(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((item) => item.id == id);
}
```


각각의 필요한 페이지

src /app /product / page.tsx
```ts
export default async function Product() {
  // 서버 파일(데이터베이스)에 있는 제품의 리스트를 읽어와서, 그걸 보여줌
  const products = await getProducts();
  return (
    <>
      <h1>Product Page</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/product/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
```

src /app /product /[slug] /page.tsx
```ts
type Props = {
  params: {
    slug: string;
  };
};
// 서버 파일에 있는 데이터 중 해당 제품의 정보를 찾아서 그걸 보여줌
export default async function ProductPage({ params: { slug } }: Props) {
  //모든 제품의 페이지들을 미리 만들어 보여줌
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <h1>{product.name} Page</h1>
      <ul></ul>
    </>
  );
}

export async function generateStaticParams() {  //동적인 페이지를 프리렌더링 하기위한
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.id,
  }));
}
```

---



### ISR 렌더링
주기적으로 렌더링이 필요한 경우 해당 페이지에 revalidate를 추가 
```js
export const revalidate = n ;

```
이후 재 빌드 한후 n초 후 새로고침 하면 재 렌더링 


### Fetch를 이용한 렌더링

기존에 사용하던 fetch로 다양한 렌더링 방식 사용가능!

##### SSG방식
```ts
export default async function HomePage (){
	const res = await fetch('https://meowfats.herokuapp.com');
	const data = res.json();
	const result = data.data[0];

return(
	<>
		<span>{result}</span>
	</>
)
}

```

##### ISR 렌더링
주기적으로 렌더링
```ts
export default async function HomePage (){
	const res = await fetch('https://meowfats.herokuapp.com',
	{
		next:{ revalidate:3 }
	});
	const data = res.json();
	const result = data.data[0];

return(
	<>
		<span>{result}</span>
	</>
)
}
```
##### SSR 렌더링
```ts
export default async function HomePage (){
	const res = await fetch('https://meowfats.herokuapp.com',
	{
		next:{ revalidate:0 }
	});
	const data = res.json();
	const result = data.data[0];
}
```
```ts
export default async function HomePage (){
	const res = await fetch('https://meowfats.herokuapp.com',
	{
		cache:'no-store'
	});
	const data = res.json();
	const result = data.data[0];
}
```


##### CSR 렌더링

components/cat-info.tsx

```ts
'use clinet'
import { useEffect, useState } from "react";
export default function CatInfo(){
	const [text, setxTest] = useState('Loading...');
	useEffect(()=>{
		fetch("https://meowfacts.herokuapp.com")
      .then((res) => res.json())
      .then((data) => setText(data.data[0]));
	},[])
	return <span>{text}</span>
}
```


## Ver12
페이지 별로 렌더링 방식 정하기

pages/ssg.tsx

```ts
type Props ={
	products: Product[]
}
export default function SSGPage({products}:Props){ //기본적으로 Client 동작
	return(
			//todo
	)
}

export async function getStaticProps(){  //next.js 에서 제공하는 Props함수는 server에서 실행
	const products = await getProducts();
	return{
		props:{products},
//revalidate: 10 ==>ISR렌더링도 가능
	}
}
```

pages/ssr.tsx
```ts
type Props ={
	products: Product[]
}
export default function SSGPage({products}:Props){ //기본적으로 Client 동작
	return(
			//todo
	)
}

export async function getServerSideProps(){  //next.js 에서 제공하는 Props함수는 server에서 실행
	const products = await getProducts();
	return{
		props:{products},
	}
}
```


## API Route

### Ver12
/services /procuts / index.js
```ts
import path from "path";
import { promises as fs } from "fs";
export type Product = {
  id: string;
  name: string;
  price: number;
};
export async function getProducts(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
  
}
export async function getProduct(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((item) => item.id == id);
```
/ pages / api / products / index.ts
```ts
import type {NextApiRequest, NextApiResponse} from 'next';
import Product from '@/services/products'

export default async function handler(
	req : NextApiRequest,
	res : NextApiResponse<Product[]>
){
	if(req.method === 'GET'){
		const products = await getProducts();
		return res.status(200).json(products)
	}
	res.status(200)
}
```
이후 api를 요청하면 getProducts( )에 요청된 데이터가 호출된다.


### Ver13
13 버전에서는 라우팅과 같이 pages에 있던 api가 app 폴더로 가게 되었고,  get,post,put,delete 등 요청 별로 구성해나갈 수 있어서 보다 더 깔끔하게 코딩할 수 있게 된거 같다.

app/api/products/route.ts

```ts
import { getProducts } from "@/services/products";
import { NextResponse } from "next/server";

export async function GET(request : Request) {
    const products = await getProducts();
    return NextResponse.json({products});
}
```

이후 localhost:3000/api/products로 확인 해 본 결과 문제 없이 잘 데이터가 나왔다. 이후 좀 더 공부 할 것!