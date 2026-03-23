<script lang="ts" setup>
import AppGrid from "~/components/global/grid/AppGrid.vue";
import Chip from "~/components/global/Chip.vue";
import { createAboutStructuredData } from "~/seo/structured-data/about";

const appConfig = useAppConfig();
const { copy, copied } = useClipboard();
const { site } = appConfig;
const { t } = useI18n();

const title = computed(() => t("seo.pages.about.title"));
const description = computed(() => t("seo.pages.about.description"));
const lead = computed(() => t("about.lead"));
const previewImageUrl =
  "https://res.cloudinary.com/deino2cjx/image/upload/v1773829369/home_nea5wi.jpg";
const ogImageAlt = computed(() => t("seo.common.ogImageAlt.portfolio"));
const aboutUrl = `${site.url}/about`;
const structuredData = computed(() =>
  JSON.stringify(
    createAboutStructuredData({
      siteUrl: site.url,
      siteName: site.name,
      pageTitle: title.value,
      pageDescription: description.value,
      imageUrl: previewImageUrl,
      jobTitle: t("seo.structuredData.personJobTitle"),
      worksForName: t("seo.structuredData.about.worksFor"),
      homeLocationName: t("seo.structuredData.about.homeLocation"),
      breadcrumbHomeName: t("seo.common.breadcrumb.home"),
      breadcrumbAboutName: t("seo.common.breadcrumb.about"),
    }),
  ),
);

useSeoMeta({
  title: () => title.value,
  description: () => description.value,

  ogTitle: () => title.value,
  ogDescription: () => description.value,
  ogType: "website",
  ogUrl: () => aboutUrl,
  ogSiteName: () => site.name,
  ogImage: previewImageUrl,
  ogImageAlt: () => ogImageAlt.value,
  ogImageWidth: "1200",
  ogImageHeight: "630",

  twitterCard: "summary_large_image",
  twitterTitle: () => title.value,
  twitterDescription: () => description.value,
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
      innerHTML: structuredData,
    },
  ],
});
</script>

<template>
  <AppGrid class="bg-background text-foreground min-h-screen content-start">
    <p class="md:mt-xl mt-lg col-span-full row-start-1 text-3xl md:col-start-1 md:col-end-8">
      {{ lead }}
    </p>
    <div
      class="mt-xl col-span-2 flex flex-col md:col-start-9 md:col-end-10 md:row-start-1 md:row-end-3"
    >
      <img
        :alt="t('about.photoAlt')"
        src="https://res.cloudinary.com/deino2cjx/image/upload/v1773841569/me_xwbkeg.png"
      />
      <span class="mt-md text-xs">{{ t("about.contactsTitle") }}</span>
      <ul class="gap-sm mt-sm flex flex-col">
        <li v-for="contact in appConfig.contacts" :key="contact.email">
          <Chip
            :label="copied ? t('common.copied') : contact.email"
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
      <h2>{{ t("about.sectionTitle") }}</h2>
      <p class="mt-1">{{ t("about.body.p1") }}</p>
      <p class="mt-4">{{ t("about.body.p2") }}</p>
    </div>
  </AppGrid>
</template>
