export default defineAppConfig({
  title: "Hello Nuxt",
  internalRoutes: [
    { label: "Home", url: "/" },
    { label: "Works", url: "/works" },
    { label: "Contacts", url: "/contacts" },
  ],
  contacts: [{ email: "info@ivansmiths.com" }],
  socials: [
    {
      label: "GitHub",
      url: "https://github.com/IvanSmiths",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/ivan-fabbri/",
    },
    {
      label: "YouTube",
      url: "https://www.youtube.com/channel/ivansmithsdev",
    },
  ],
});
