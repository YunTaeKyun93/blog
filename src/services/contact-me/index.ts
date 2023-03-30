import { EmailData } from "../email";
export async function ContactMe(email: EmailData) {
    const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(email),
        headers: {
          'Content-Type': 'applicatioin/json',
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || '서버 요청에 실패함 😂');
      }
      return data;
}
