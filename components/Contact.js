import { useState } from 'react';
import cn from 'classnames';

function Contact() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <span className="contact-span" onClick={() => setOpened(!opened)}>
        Parliamo
      </span>
      <div className={cn('overlay-burger-menu menu2', { 'as-opened': opened })}>
        <span className="close-burger2" onClick={() => setOpened(!opened)}>
          X
        </span>
        <div className="contact-cnt">
          <form
            action="https://formsubmit.co/info@ivansmiths.com"
            method="POST"
            className="form"
          >
            <input
              type="hidden"
              name="_next"
              value="http://localhost:3000/message"
            />
            <input type="hidden" name="_subject" value="IvanSmiths | Info" />
            <label htmlFor="name" className="small-font">
              Name
            </label>
            <input type="text" id="name" name="name" minLength="3" required />
            <label htmlFor="object" className="small-font">
              Object
            </label>
            <input
              type="text"
              id="object"
              name="object"
              minLength="4"
              required
            />
            <label htmlFor="email" className="small-font">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              minLength="6"
              required
            />
            <label className="small-font" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              minLength="10"
              cols="30"
              rows="10"
            ></textarea>
            <button className="btn-contact small-font" type="submit">
              Send
            </button>
          </form>
          <br />
          OR
          <a className="mail-contact" href="mailto:info@ivansmiths.it">info@ivansmiths.it</a>
        </div>
      </div>
    </>
  );
}

export default Contact;
