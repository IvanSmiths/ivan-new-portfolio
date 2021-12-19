import { useState } from 'react';
import cn from 'classnames';

function Contact() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <span className="contact-span" onClick={() => setOpened(!opened)}>
        Parliamo
      </span>
      <div className={cn('overlay-burger-menu', { 'as-opened': opened })}>
        <div className="contact-cnt">
          <em className="medium-font">
            It is dangerous to go alone, take this.
          </em>
          <div className="zelda-cnt">
            <span className="medium-font">🔥</span>
            <span className="medium-font">👴</span>
            <span className="medium-font">🔥</span>
          </div>
          <div className="email-cnt">
            <a className="email-form" href="mailto:info@ivansmiths.com">
              info@ivansmiths.com
            </a>
            <span className="medium-font">🙌</span>
          </div>
          <h2 className="medium-font highlight-main">form</h2>
          <div className="form-cnt">
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
                name
              </label>
              <input type="text" id="name" name="name" minLength="3" required />
              <label htmlFor="object" className="small-font">
                object
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
                message
              </label>
              <textarea
                id="message"
                name="message"
                minLength="10"
                cols="30"
                rows="10"
              ></textarea>
              <button className="btn-contact" type="submit">
                send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
