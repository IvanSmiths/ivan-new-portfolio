<script lang="ts" setup>
import AppGrid from "~/components/global/grid/AppGrid.vue";
import Chip from "~/components/global/Chip.vue";
import { createAboutStructuredData } from "~/seo/structured-data/about";

const appConfig = useAppConfig();
const { copy, copied } = useClipboard();
const { site } = appConfig;

const title = "About Ivan Smiths | Full-Stack Developer & UX Engineer";
const description =
  "Full-Stack Developer with 5+ years of experience building user-focused web applications. Specialized in Next.js, TypeScript, and UX design, with work for brands like Adidas and Deutsche Bahn.";
const previewImageUrl =
  "https://res.cloudinary.com/deino2cjx/image/upload/v1773829369/home_nea5wi.jpg";
const aboutUrl = `${site.url}/about`;

useSeoMeta({
  title: () => title,
  description: () => description,

  ogTitle: () => title,
  ogDescription: () => description,
  ogType: "website",
  ogUrl: () => aboutUrl,
  ogSiteName: () => site.name,
  ogImage: previewImageUrl,
  ogImageAlt: "Ivan Smiths's portfolio preview",
  ogImageWidth: "1200",
  ogImageHeight: "630",

  twitterCard: "summary_large_image",
  twitterTitle: () => title,
  twitterDescription: () => description,
  twitterImage: previewImageUrl,
  twitterCreator: "@IvanSmiths",
  twitterSite: "@IvanSmiths",

  author: "Ivan Smiths",
  applicationName: "Ivan Smiths Portfolio",
  generator: "Nuxt",
  robots: "index, follow",
  charset: "utf-8",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: aboutUrl,
    },
  ],
  script: [
    {
      id: "ld-json-about",
      type: "application/ld+json",
      innerHTML: JSON.stringify(
        createAboutStructuredData({
          siteUrl: site.url,
          siteName: site.name,
          pageTitle: title,
          pageDescription: description,
          imageUrl: previewImageUrl,
        }),
      ),
    },
  ],
});
</script>

<template>
  <AppGrid class="bg-background text-foreground min-h-screen content-start">
    <p class="md:mt-xl mt-lg col-span-full row-start-1 text-3xl md:col-start-1 md:col-end-8">
      From independent studios to global banks, I've spent the last 5 years building digital
      products that people actually use, and that businesses actually grow from. I care about the
      details that drive outcomes: the interface that earns trust before a single word is read.
    </p>
    <div
      class="mt-xl col-span-2 flex flex-col md:col-start-9 md:col-end-10 md:row-start-1 md:row-end-3"
    >
      <img
        alt="me"
        src="https://res.cloudinary.com/deino2cjx/image/upload/v1773841569/me_xwbkeg.png"
      />
      <span class="mt-md text-xs">Contacts</span>
      <ul class="gap-sm mt-sm flex flex-col">
        <li v-for="contact in appConfig.contacts" :key="contact.email">
          <Chip
            :label="copied ? 'Copied' : contact.email"
            as="button"
            class="cursor-pointer"
            @click="copy(contact.email)"
          />
        </li>
        <li v-for="social in appConfig.socials" :key="social.label">
          <Chip
            :href="social.url"
            :label="social.label"
            as="a"
            external
            rel="noopener noreferrer"
            target="_blank"
          />
        </li>
      </ul>
    </div>
    <div class="mt-xl col-span-full row-start-2 text-sm md:col-start-1 md:col-end-5">
      <h2>About</h2>
      <p class="mt-1">
        I've worked across the full spectrum of digital e-commerce, financial platforms, agency
        production, enterprise banking and the throughline has always been the same: design and
        engineering are not separate concerns. <br /><br />
        The best products I've built came from treating performance, accessibility, and user
        behavior as design materials, not afterthoughts. I've led teams through technical
        modernizations, shipped compliance-ready banking tools, rebuilt mobile apps from scratch,
        and helped studios land work with some of the world's most recognized brands.
      </p>
    </div>
  </AppGrid>
</template>
