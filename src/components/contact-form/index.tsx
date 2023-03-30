"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { BannerData } from "@/components/success-banner";
import SuccessBanner from "./../success-banner/index";
import { ContactMe } from "@/services/contact-me";
import classnames from "classnames/bind";
import styles from "./contact-form.module.scss";
type Form = {
  from: string;
  subject: string;
  message: string;
};
const ss = classnames.bind(styles);

const INITIAL_DATA = { from: "", subject: "", message: "" };
export default function ContactForm() {
  const [form, setForm] = useState<Form>(INITIAL_DATA);
  const [banner, setBanner] = useState<BannerData | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ContactMe(form)
      .then(() => {
        setBanner({
          message: "메일을 성공적으로 보냈습니다!!",
          state: "success"
        });
        setForm(INITIAL_DATA);
      })
      .catch(() => {
        setBanner({
          message: "메일전송에 실패했습니다. 다시 시도해주세요.",
          state: "error"
        });
      })
      .finally(() => {
        setTimeout(() => {
          setBanner(null);
        }, 3000);
      });
  };
  return (
    <div className={ss("container")}>
      {banner && <SuccessBanner banner={banner} />}
      <form onSubmit={onSubmit}>
        <div className={ss("form-group")}>
          <label htmlFor="email" className={ss("form-label")}>
            Your Email
          </label>
          <input
            className={ss("form-control")}
            type="email"
            id="from"
            name="from"
            required
            autoFocus
            value={form.from}
            onChange={onChange}
          />
        </div>
        <div className={ss("form-group")}>
          <label htmlFor="subject" className={ss("form-label")}>
            Subject
          </label>
          <input
            className={ss("form-control")}
            type="text"
            id="subject"
            name="subject"
            required
            value={form.subject}
            onChange={onChange}
          />
        </div>
        <div className={ss("form-group")}>
          <label htmlFor="message" className={ss("form-label")}>
            Message
          </label>
          <textarea
            className={ss("form-control")}
            rows={10}
            id="message"
            name="message"
            required
            value={form.message}
            onChange={onChange}
          />
        </div>
        <button className={ss("btn")}>Submit</button>
      </form>
    </div>
  );
}
