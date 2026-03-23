export function useThemeInit() {
  useHead({
    script: [
      {
        innerHTML: `
          (function() {
            try {
              const savedTheme = localStorage.getItem('theme');
              const supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
              if (savedTheme === 'dark' || (!savedTheme && supportDarkMode)) {
                document.documentElement.classList.add('dark');
              }
              if (sessionStorage.getItem('works_loader_seen') === '1') {
                document.documentElement.classList.add('loader-seen');
              }
            } catch (e) {}
          })();
        `,
        type: "text/javascript",
      },
    ],
  });
}
