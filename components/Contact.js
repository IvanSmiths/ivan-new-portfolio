import { useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';

function Contact() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  //   Form validation
  const [errors, setErrors] = useState({});

  //   Setting button text
  const [buttonText, setButtonText] = useState('Send');

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (fullname.length <= 0) {
      tempErrors['fullname'] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors['email'] = true;
      isValid = false;
    }
    if (subject.length <= 0) {
      tempErrors['subject'] = true;
      isValid = false;
    }
    if (message.length <= 0) {
      tempErrors['message'] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log('errors', errors);
    return isValid;
  };

  //   const [form, setForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValidForm = handleValidation();

    if (isValidForm) {
      setButtonText('Sending');
      const res = await fetch('/api/sendgrid', {
        body: JSON.stringify({
          email: email,
          fullname: fullname,
          subject: subject,
          message: message,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      const { error } = await res.json();
      if (error) {
        console.log(error);
        setShowSuccessMessage(false);
        setShowFailureMessage(true);
        setButtonText('Send');

        // Reset form fields
        setFullname('');
        setEmail('');
        setMessage('');
        setSubject('');
        return;
      }
      setShowSuccessMessage(true);
      setShowFailureMessage(false);
      setButtonText('Send');
      // Reset form fields
      setFullname('');
      setEmail('');
      setMessage('');
      setSubject('');
    }
  };
  const [opened, setOpened] = useState(false);
  return (
    <>
      <span className="contact-span" onClick={() => setOpened(!opened)}>
        lets talk
      </span>
      <div className={cn('overlay-burger-menu', { 'as-opened': opened })}>
        <form onSubmit={handleSubmit} className="">
          <span className="">Send a message</span>

          <label htmlFor="fullname" className="">
            Full name
            <span className="">*</span>
          </label>
          <input
            id="fullname"
            type="text"
            value={fullname}
            onChange={(e) => {
              setFullname(e.target.value);
            }}
            name="fullname"
            className=""
          />
          {errors?.fullname && <em className="">Fullname cannot be empty.</em>}

          <label htmlFor="email" className="">
            E-mail<span className="">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className=""
          />
          {errors?.email && <em className="">Email cannot be empty.</em>}

          <label htmlFor="subject" className="">
            Subject<span className="">*</span>
          </label>
          <input
            id="subject"
            type="text"
            name="subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
          />
          {errors?.subject && <em className="">Subject cannot be empty.</em>}
          <label htmlFor="message" className="">
            Message<span className="">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className=""
          ></textarea>
          {errors?.message && (
            <em className="">Message body cannot be empty.</em>
          )}
          <div className="">
            <button type="submit" className="">
              {buttonText}
            </button>
          </div>
          <div className="text-left">
            {showSuccessMessage && (
              <p className="">Thankyou! Your Message has been delivered.</p>
            )}
            {showFailureMessage && (
              <p className="">Oops! Something went wrong, please try again.</p>
            )}
          </div>
        </form>
        <span className="contact-close-span" onClick={() => setOpened(!opened)}>
          X
        </span>
      </div>
    </>
  );
}

export default Contact;
