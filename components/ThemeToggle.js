import { useState, useEffect, useContext } from 'react';
import { CursorContext } from './CursorManager';

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

  // MOUSE ZOOM HANDLER //
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize('medium');
  };
  const handleMouseLeave = () => {
    setSize('small');
  };

  return (
    <>
      {activeTheme === 'dark' ? (
        <span
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label={`Change to ${inactiveTheme}`}
          className="theme-toggle"
          onClick={() => setActiveTheme(inactiveTheme)}
        >
          🌙
        </span>
      ) : (
        <span
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
