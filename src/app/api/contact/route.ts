import { sendEmail } from "@/services/email";
import * as yup from "yup";
const bodySchema = yup.object().shape({
  from: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().required()
});

/*
req.body, req.query, req.params => Express JS
body-parser 라이브러리 없이는 req.body를 못 씀. 

await res.json() => Next JS


*/
export async function POST(req: Request, res: Response) {
  const rawBody = await req.json();
  // console.log('***');
  // const text = await req.text();
  // console.log(typeof text);
  // console.log(text);

  // const body = JSON.parse(text);

  // console.log('###');
  // console.log(typeof body);
  // console.log(body);

  let body: {
    from: string;
    subject: string;
    message: string;
  };
  
  try {
    body = await bodySchema.cast(rawBody);
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        message: "잘못된 파라미터가 전달되었습니다",
        errorData: error, 
      }), 
      {
        status: 400
      }
    );
  }
  // const body = await bodySchema.cast(rawBody);

  // if (!bodySchema.isValidSync(body)) {
  //   return new Response(JSON.stringify({ message: "메일 전송에 실패함!" }), {
  //     status: 400
  //   });
  // }

  try {
    await sendEmail(body);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "메일 전송에 실패함!" }), {
      status: 500
    });
  }

  return new Response(JSON.stringify({ message: "메일을 성공적으로 보냈음" }), {
    status: 200
  });

  // return sendEmail(body) //
  //   .then(
  //     () =>
  //       new Response(JSON.stringify({ message: '메일을 성공적으로 보냈음' }), {
  //         status: 200,
  //       })
  //   )
  //   .catch((error) => {
  //     console.error(error);
  //     return new Response(JSON.stringify({ message: '메일 전송에 실패함!' }), {
  //       status: 500,
  //     });
  //   });
}

// {
//   name: joi.string().required(),
//   age: joi.number().integer().min(1).required(),
//   gedner: joi.alt('male', 'female', 'others').default('male'),
// }

// {
//   name: 'Jack',
//   age: 24,
// }

// {
//   name: 'Jack',
//   age: '24',
// } // OK

// rawBody, body

// typeof rawBody.age => string

// typeof body.age => number

// rawBody.gender => undefined

// body.gender => 'male'