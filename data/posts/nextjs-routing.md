# Ver12 와 Ver13 별 라우팅 방식

## 1. 정적 라우팅(Ver 12)

src 하위 폴더 중 pages 안에 원하는 url path이름으로 파일을 만들면 라우팅 가능
 ``src/pages/contact.tsx ``
 ``localhost:3000/contact``
![ver12routing](/public/images/post-contents/ver12routing.png)


![Routing in Next.js Ver12](https://dcv19h61vib2d.cloudfront.net/thumbs/egghead-understand-static-and-dynamic-page-routing-in-next-js-Sk8Ik2h8U/egghead-understand-static-and-dynamic-page-routing-in-next-js-Sk8Ik2h8U.jpg)


__중첩 경로 사용 시 폴더를 만들어서 사용 가능__
``src/pages/products/index.tsx   localhost:3000/products``
``src/pages/products/pants/index.tsx   localhost:3000/products/pants``


## 1-2. 정적 라우팅(Ver 12)

pages 대신 app 안에 폴더를 만들어서 사용 할 수 있음
 `` src/app/contact/page.tsx ``
 ``localhost:3000/contact``


__중첩 경로 사용 시 폴더를 만들어서 사용 가능__
``src/pages/products/page.tsx``   ``localhost:3000/products``
``src/pages/products/pants/page.tsx``
``localhost:3000/products/pants``


## 2. 동적 라우팅
``src / app / product /[slug]/page.tsx
```js
    type Props ={slug:string;}

    export default function ProductDetailPage ({params}:Props){
        return <h1>{params} 상품 페이지</h1>
    }
```
폴더 이름을 ( )로 묶어서 그룹으로 묶을 수 있다. 실제 라우팅에는 지장을 안준다
__정리용도__
app/(marketing)/about/page.tsx

app/(marketing)/blog/page.tsx


___

### Dynamic Segment
|Route|Example Url|Params|
|:---:|:---:|:-----:|
|app/blog/[slug]/page.jsx|/blog/a|{slug: 'a'}|
|app/blog/[slug]/page.jsx|/blog/b|{slug: 'b'}|
|app/blog/[slug]/page.jsx|/blog/c|{slug: 'c'}|
 ___ 

### Catch-all Segments
괄호 안에 말줄임표(...)를 추가하여 동적 세그먼트를 모든 후속 세그먼트 로 확장할 수 있습니다
|Route|Example Url|Params|
|:---:|:---:|:-----:|
|app/blog/[slug]/page.jsx|/blog/a|{slug: ['a']}|
|app/blog/[slug]/page.jsx|/blog/a/b|{slug: ['a','b']}|
|app/blog/[slug]/page.jsx|/blog/a/b/c|{slug: ['a','b','c']}|


### Optional Catch-all Segments
포괄적인 세그먼트는 이중 대괄호``[[]]`` 안에 매개변수를 포함하여 옵션으로 만들 수 있습니다.
catch-all 세그먼트 와 선택적 catch-all 세그먼트 의 차이점은 optional을 사용하면 매개변수가 없는 경로도 일치한다는 것입니다.
|Route|Example Url|Params|
|:---:|:---:|:-----:|
|app/blog/[[slug]]/page.jsx|/blog|{}|
|app/blog/[[slug]]/page.jsx|/blog/a|{slug: ['a']}|
|app/blog/[[slug]]/page.jsx|/blog/a/b|{slug: ['a','b']}|
|app/blog/[[slug]]/page.jsx|/blog/a/b/c|{slug: ['a','b','c']}|



### SSG
특정 키워드에 대해서는 미리 페이지를 만들고 싶을 때(pre rendering)

```js
export function generateStaticParams(){
    const examples = ['a','b'];
    return examples.map(item=>({
        slug:item
    }))
}
```