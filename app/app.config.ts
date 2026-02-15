export default defineAppConfig({
  title: "Hello Nuxt",
  internalRoutes: [
    { label: "Home", url: "/" },
    { label: "Works", url: "/works" },
  ],
  contacts: [{ email: "info@ivansmiths.com" }],
  socials: [
    {
      x: {
        xCreator: "@Ivansmiths",
        xCreatorId: "1303746727594405894",
      },
    },
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
