/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { motion, useAnimation } from 'framer-motion';

const path01Variants = {
  open: { d: 'M3.06061 2.99999L21.0606 21' },
  closed: { d: 'M0 9.5L24 9.5' },
};

const path02Variants = {
  open: { d: 'M3.00006 21.0607L21 3.06064' },
  moving: { d: 'M0 14.5L24 14.5' },
  closed: { d: 'M0 14.5L15 14.5' },
};

function Navbar() {
  let router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const [isDesktop, setDesktop] = useState(false);
  const path01Controls = useAnimation();
  const path02Controls = useAnimation();

  const onClick = async () => {
    setOpen(!isOpen);
    setOpened(!opened);
    if (!isOpen) {
      await path02Controls.start(path02Variants.moving);
      path01Controls.start(path01Variants.open);
      path02Controls.start(path02Variants.open);
    } else {
      path01Controls.start(path01Variants.closed);
      await path02Controls.start(path02Variants.moving);
      path02Controls.start(path02Variants.closed);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 450) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth < 450) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  let { t } = useTranslation();
  return (
    <>
      {isDesktop ? (
        <>
          <svg
            className="button-nav"
            onClick={onClick}
            width="44"
            height="44"
            viewBox="0 0 24 24"
          >
            <motion.path
              {...path01Variants.closed}
              animate={path01Controls}
              transition={{ duration: 0.4 }}
            />
            <motion.path
              {...path02Variants.closed}
              animate={path02Controls}
              transition={{ duration: 0.4 }}
            />
          </svg>
          <nav
            className={cn('overlay-burger-menu menu-mobile', {
              'as-opened': opened,
            })}
          >
            <div className="burger-menu-info-cnt">
              <ul className="burger-menu-links-cnt ">
                <li>
                  <span className="lines2"></span>
                </li>
                <li>
                  <Link href="/">
                    <a
                      onClick={() => setOpened(!opened)}
                      className="big-font-inverse"
                    >
                      {t('common:nav-home')}
                    </a>
                  </Link>
                </li>
                <li>
                  <span className="lines2"></span>
                </li>
                <li>
                  <Link href="/stuff">
                    <a
                      onClick={() => setOpened(!opened)}
                      className="big-font-inverse"
                    >
                      {t('common:nav-stuff')}
                    </a>
                  </Link>
                </li>
                <li>
                  <span className="lines2"></span>
                </li>
                <li>
                  <Link href="/about">
                    <a
                      onClick={() => setOpened(!opened)}
                      className="big-font-inverse"
                    >
                      {t('common:nav-about')}
                    </a>
                  </Link>
                </li>
                <li>
                  <span className="lines2"></span>
                </li>
                <li>
                  <Link href="/post">
                    <a
                      onClick={() => setOpened(!opened)}
                      className="big-font-inverse"
                    >
                      {t('common:nav-post')}
                    </a>
                  </Link>
                </li>
                <li>
                  <span className="lines2"></span>
                </li>
              </ul>
            </div>
            <div className="burger-menu-info-personal-cnt small-font">
              <a
                className="medium-font text-inverse"
                href="mailto:info@ivansmiths.com?cc=ivansmiths3d@gmail.com"
              >
                info@ivansmiths.com
              </a>
            </div>
            <ul className="lang-cnt2">
              <li>
                <Link locale="en" href={router.asPath}>
                  <a className="medium-font">{router.locales[0]}</a>
                </Link>
              </li>
              <li className="medium-font">/</li>
              <li>
                <Link locale="it" href={router.asPath}>
                  <a className="medium-font">{router.locales[1]}</a>
                </Link>
              </li>
            </ul>
            <div className="social-mobile-cnt">
              <ul className="social-mobile">
                <li>
                  <a
                    title="github"
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://www.github.com/ivanSmiths"
                  >
                    <svg
                      id="github"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 33.742 33.04"
                    >
                      <g
                        id="Raggruppa_1"
                        data-name="Raggruppa 1"
                        transform="translate(0 0)"
                      >
                        <path
                          id="Tracciato_4"
                          data-name="Tracciato 4"
                          d="M16.869,5.329A16.949,16.949,0,0,0,11.54,38.34c.844.156,1.151-.367,1.151-.816,0-.4-.015-1.468-.023-2.881-4.692,1.023-5.684-2.271-5.684-2.271a4.473,4.473,0,0,0-1.873-2.478c-1.533-1.05.114-1.029.114-1.029a3.543,3.543,0,0,1,2.583,1.746,3.586,3.586,0,0,0,4.912,1.407,3.616,3.616,0,0,1,1.071-2.265c-3.745-.428-7.685-1.881-7.685-8.37a6.566,6.566,0,0,1,1.738-4.547,6.1,6.1,0,0,1,.164-4.481s1.417-.456,4.64,1.736a15.925,15.925,0,0,1,8.448,0c3.22-2.191,4.635-1.736,4.635-1.736a6.113,6.113,0,0,1,.169,4.481,6.553,6.553,0,0,1,1.734,4.547c0,6.506-3.944,7.938-7.7,8.358a4.052,4.052,0,0,1,1.145,3.136c0,2.265-.021,4.091-.021,4.646,0,.453.3.981,1.16.814A16.95,16.95,0,0,0,16.869,5.329Z"
                          transform="translate(0 -5.329)"
                          fill="#2e2d3a"
                        />
                      </g>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    title="linkedin"
                    href="https://it.linkedin.com/in/ivan-fabbri-932aaa205?trk=people-guest_people_search-card"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 33.784 33.897"
                    >
                      <g id="linkedin" transform="translate(0 0.11)">
                        <g
                          id="Raggruppa_15"
                          data-name="Raggruppa 15"
                          transform="translate(0.042 10.589)"
                        >
                          <g id="Raggruppa_14" data-name="Raggruppa 14">
                            <rect
                              id="Rettangolo_3"
                              data-name="Rettangolo 3"
                              width="7.546"
                              height="23.198"
                              fill="#2e2d3a"
                            />
                          </g>
                        </g>
                        <g
                          id="Raggruppa_17"
                          data-name="Raggruppa 17"
                          transform="translate(10.586 10.589)"
                        >
                          <g id="Raggruppa_16" data-name="Raggruppa 16">
                            <path
                              id="Tracciato_8"
                              data-name="Tracciato 8"
                              d="M177.555,160.272c-.08-.025-.156-.053-.24-.076-.1-.023-.2-.042-.306-.059a6.764,6.764,0,0,0-1.354-.137c-4.4,0-7.189,3.2-8.109,4.435V160H160v23.2h7.546V170.545s5.7-7.942,8.109-2.109V183.2H183.2V167.544A7.524,7.524,0,0,0,177.555,160.272Z"
                              transform="translate(-160 -160)"
                              fill="#2e2d3a"
                            />
                          </g>
                        </g>
                        <g
                          id="Raggruppa_19"
                          data-name="Raggruppa 19"
                          transform="translate(0 0)"
                        >
                          <g
                            id="Raggruppa_18"
                            data-name="Raggruppa 18"
                            transform="translate(0 0)"
                          >
                            <circle
                              id="Ellisse_10"
                              data-name="Ellisse 10"
                              cx="3.5"
                              cy="3.5"
                              r="3.5"
                              transform="translate(0 -0.11)"
                              fill="#2e2d3a"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    title="artstation"
                    href="https://www.artstation.com/ivansmiths"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg
                      id="ArtStation-logomark-white"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 33.784 29.729"
                    >
                      <path
                        id="Tracciato_1"
                        data-name="Tracciato 1"
                        d="M51.4,123.3l2.842,4.918h0a3.43,3.43,0,0,0,3.034,1.884H76.211l-3.928-6.8H51.4Z"
                        transform="translate(-51.4 -100.373)"
                        fill="#2e2d3a"
                      />
                      <path
                        id="Tracciato_2"
                        data-name="Tracciato 2"
                        d="M113.432,74.459a3.4,3.4,0,0,0-.543-1.852L101.777,53.32a3.383,3.383,0,0,0-3-1.82H92.9l17.148,29.7,2.714-4.694A3.513,3.513,0,0,0,113.432,74.459Z"
                        transform="translate(-79.648 -51.5)"
                        fill="#2e2d3a"
                      />
                      <path
                        id="Tracciato_3"
                        data-name="Tracciato 3"
                        d="M75.5,79.852,67.864,66.6,60.2,79.852Z"
                        transform="translate(-57.39 -61.778)"
                        fill="#2e2d3a"
                      />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    title="instagram"
                    href="https://www.instagram.com/ivan_smiths/?hl=en"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg
                      id="instagram"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 33.742 33.743"
                    >
                      <g id="Raggruppa_3" data-name="Raggruppa 3">
                        <g id="Raggruppa_2" data-name="Raggruppa 2">
                          <path
                            id="Tracciato_5"
                            data-name="Tracciato 5"
                            d="M23.2,0H10.545A10.546,10.546,0,0,0,0,10.545V23.2A10.546,10.546,0,0,0,10.545,33.743H23.2A10.546,10.546,0,0,0,33.742,23.2V10.545A10.546,10.546,0,0,0,23.2,0Zm7.381,23.2A7.389,7.389,0,0,1,23.2,30.579H10.545A7.389,7.389,0,0,1,3.163,23.2V10.545a7.389,7.389,0,0,1,7.381-7.381H23.2a7.389,7.389,0,0,1,7.381,7.381Z"
                            fill="#2e2d3a"
                          />
                        </g>
                      </g>
                      <g
                        id="Raggruppa_5"
                        data-name="Raggruppa 5"
                        transform="translate(8.436 8.436)"
                      >
                        <g id="Raggruppa_4" data-name="Raggruppa 4">
                          <path
                            id="Tracciato_6"
                            data-name="Tracciato 6"
                            d="M136.436,128a8.436,8.436,0,1,0,8.436,8.436A8.436,8.436,0,0,0,136.436,128Zm0,13.708a5.272,5.272,0,1,1,5.272-5.272A5.28,5.28,0,0,1,136.436,141.708Z"
                            transform="translate(-128 -128)"
                            fill="#2e2d3a"
                          />
                        </g>
                      </g>
                      <g
                        id="Raggruppa_7"
                        data-name="Raggruppa 7"
                        transform="translate(24.815 6.679)"
                      >
                        <g id="Raggruppa_6" data-name="Raggruppa 6">
                          <ellipse
                            id="Ellisse_8"
                            data-name="Ellisse 8"
                            cx="1.124"
                            cy="1.124"
                            rx="1.124"
                            ry="1.124"
                            fill="#2e2d3a"
                          />
                        </g>
                      </g>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <span className="close-burger" onClick={() => setOpened(!opened)}>
              {t('common:close')}
            </span>
          </nav>
        </>
      ) : (
        <>
          <svg
            className="button-nav"
            onClick={onClick}
            width="44"
            height="44"
            viewBox="0 0 24 24"
          >
            <motion.path
              {...path01Variants.closed}
              animate={path01Controls}
              transition={{ duration: 0.4 }}
            />
            <motion.path
              {...path02Variants.closed}
              animate={path02Controls}
              transition={{ duration: 0.4 }}
            />
          </svg>
          <nav className={cn('overlay-burger-menu', { 'as-opened': opened })}>
            <div className="links-socials-cnt">
              <ul className="burger-menu-links-cnt">
                <li>
                  <Link href="/">
                    <a
                      onClick={() => setOpened(!opened)}
                      className="impact medium-font"
                    >
                      {t('common:nav-home')}
                    </a>
                  </Link>
                </li>

                <li>
                  <Link href="/stuff">
                    <a
                      onClick={() => setOpened(!opened)}
                      className="impact medium-font"
                    >
                      {t('common:nav-stuff')}
                    </a>
                  </Link>
                </li>

                <li>
                  <Link href="/about">
                    <a
                      onClick={() => setOpened(!opened)}
                      className="impact medium-font"
                    >
                      {t('common:nav-about')}
                    </a>
                  </Link>
                </li>

                <li>
                  <Link href="/post">
                    <a
                      onClick={() => setOpened(!opened)}
                      className="impact medium-font"
                    >
                      {t('common:nav-post')}
                    </a>
                  </Link>
                </li>
              </ul>
              <ul className="nav-social-cnt">
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/ivan_smiths"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.artstation.com/ivansmiths"
                  >
                    Artstation
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/IvanSmiths"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://it.linkedin.com/in/ivan-fabbri-932aaa205?trk=people-guest_people_search-card"
                  >
                    Linkedin
                  </a>
                </li>
              </ul>
            </div>
            <div className="burger-menu-info-cnt">
              <em className="small-font impact uppercase">- Ivan Smiths</em>
              <p className="small-font">{t('common:about')}</p>
              <motion.a
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                variants={{
                  hidden: { y: 0, rotateZ: '0deg' },
                  visible: { y: 0, rotateZ: '11deg' },
                }}
                href="mailto:info@ivansmiths.com"
                className="btn-big btn-email small-font"
              >
                info@ivansmiths.com
              </motion.a>
            </div>
          </nav>
        </>
      )}
    </>
  );
}

export default Navbar;
