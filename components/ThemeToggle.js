import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme);
  const inactiveTheme = activeTheme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem('theme', activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    savedTheme && setActiveTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem('theme', activeTheme);
  }, [activeTheme]);

  return (
    <>
      {activeTheme === 'dark' ? (
        <span
          aria-label={`Change to ${inactiveTheme}`}
          className="theme-toggle"
          onClick={() => setActiveTheme(inactiveTheme)}
        >
          🌙
        </span>
      ) : (
        <span
          aria-label={`Change to ${inactiveTheme}`}
          className="theme-toggle"
          onClick={() => setActiveTheme(inactiveTheme)}
        >
          ☀️
        </span>
      )}
    </>
  );
};

export default ThemeToggle;
