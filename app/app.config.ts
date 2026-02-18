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
      github: {
        url: "https://github.com/IvanSmiths",
      },
    },
    {
      linkedIn: {
        url: "https://www.linkedin.com/in/ivan-fabbri/",
      },
    },
    {
      youtube: {
        url: "https://www.youtube.com/channel/ivansmithsdev",
      },
    },
  ],
});
