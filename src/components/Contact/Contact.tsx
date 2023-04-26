import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { AiFillCloseCircle } from 'react-icons/ai';

const Contact = ({ handleContact }: { handleContact: any }) => {
  const form = useRef<any>();

  const [message, setMessage] = useState<any>();

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_1ndo4oh',
        'template_1kf2ka5',
        form.current,
        'user_nkuxTGXoXxf23yPeCJXpo'
      )
      .then(
        (result: any) => {
          console.log(result);
          if (result.status === 200) {
            setMessage('Message Sent!');
            form.current[0].value = '';
            form.current[1].value = '';
            form.current[2].value = '';
            setTimeout(function () {
              setMessage(null);
            }, 3000);
          }
        },
        (error: any) => {
          console.log(error.text);
          setMessage('Failed to send message. Please try again.');
          setTimeout(function () {
            setMessage(null);
          }, 3000);
        }
      );
  };

  return (
    <div className=" w-full h-full sm:w-[50vw] sm:h-[50vh] bg-white rounded-xl relative opacity-[0.9] p-5 flex flex-col justify-center items-center">
      <AiFillCloseCircle
        className="right-[10px] top-[10px] text-2xl absolute hover:text-white hover:bg-blue-500 rounded-full"
        onClick={() => handleContact()}
      />
      <form
        ref={form}
        onSubmit={sendEmail}
        className="flex flex-col justify-around items-center w-full p-10"
      >
        <div className="my-2 flex flex-row justify-around items-center w-full">
          <label className="font-semibold">Name:</label>
          <input
            required
            className="mx-2 border-black border-[2px] rounded-lg w-full px-2 py-1"
            type="text"
            name="user_name"
          />
        </div>
        <div className="my-2 flex flex-row justify-around items-center w-full">
          <label className="font-semibold">Email:</label>
          <input
            required
            className="mx-2 border-black border-[2px] rounded-lg w-full px-2 py-1"
            type="email"
            name="user_email"
          />
        </div>

        <div className="my-2 flex flex-row justify-around items-center w-full">
          <label className="font-semibold">Message:</label>
          <textarea
            required
            className="mx-2 border-black border-[2px] rounded-lg w-full px-2 py-1 min-h-[80px]"
            name="message"
          />
        </div>

        <button
          className="my-4 font-semibold bg-blue-400 hover:bg-blue-600 rounded-2xl min-w-[100px] h-[40px] shadow-xl"
          type="submit"
        >
          Send
        </button>
      </form>
      <div className="mt-4 mx-auto text-center flex flex-col justify-center items-center">
        {message}
      </div>
    </div>
  );
};

export default Contact;
