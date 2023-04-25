import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { AiFillCloseCircle } from 'react-icons/ai';

const Contact = ({ handleContact }: { handleContact: any }) => {
  const form = useRef<any>();

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        form.current,
        'YOUR_PUBLIC_KEY'
      )
      .then(
        (result: any) => {
          console.log(result.text);
        },
        (error: any) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className=" w-full h-full sm:w-[50vw] sm:h-[50vh] bg-white rounded-xl relative opacity-[0.9] p-5">
      <AiFillCloseCircle
        className="right-[10px] top-[10px] text-2xl absolute"
        onClick={() => handleContact()}
      />
      <form
        ref={form}
        onSubmit={sendEmail}
        className="flex flex-col justify-center items-center"
      >
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default Contact;
