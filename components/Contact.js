import { useState } from 'react';
import cn from 'classnames';
import useTranslation from 'next-translate/useTranslation';

function Contact() {
  const [opened, setOpened] = useState(false);
  let { t } = useTranslation();

  return (
    <>
      <span className="contact-span" onClick={() => setOpened(!opened)}>
        {t('common:let-us-talk')}
      </span>
      <div className={cn('overlay-burger-menu menu2', { 'as-opened': opened })}>
        <span className="close-burger2" onClick={() => setOpened(!opened)}>
          {t('common:close')}
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
              {t('common:name')}
            </label>
            <input type="text" id="name" name="name" minLength="3" required />
            <label htmlFor="object" className="small-font">
              {t('common:object')}
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
              {t('common:message')}
            </label>
            <textarea
              id="message"
              name="message"
              minLength="10"
              cols="30"
              rows="10"
            ></textarea>
            <button className="btn-contact small-font" type="submit">
              {t('common:send')}
            </button>
          </form>

          <a
            className="mail-contact medium-font"
            href="mailto:info@ivansmiths.com"
          >
            info@ivansmiths.com
          </a>
        </div>
      </div>
    </>
  );
}

export default Contact;
