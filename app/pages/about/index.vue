<script lang="ts" setup>
import AppGrid from "~/components/global/grid/AppGrid.vue";

const appConfig = useAppConfig();
const { copy, copied } = useClipboard();
</script>

<template>
  <AppGrid class="bg-background text-foreground min-h-screen content-start">
    <p class="mt-xl col-start-1 col-end-8 text-3xl">
      From independent studios to global banks, I've spent the last 5 years building digital
      products that people actually use, and that businesses actually grow from. I care about the
      details that drive outcomes: the interface that earns trust before a single word is read.
    </p>
    <img alt="" class="mt-xl col-start-9 col-end-10" src="/me.png" />
    <span class="mt-md col-start-9 col-end-10 text-xs">Contacts</span>
    <ul class="col-start-9 col-end-10 text-xs">
      <li v-for="contact in appConfig.contacts" :key="contact.email" class="mt-sm text-base">
        <button class="cursor-pointer" @click="copy(contact.email)">
          {{ copied ? "Copied" : contact.email }}
        </button>
      </li>
      <li v-for="social in appConfig.socials" :key="social.label">
        <a :href="social.url" class="mt-xs text-base" rel="noopener noreferrer" target="_blank">
          {{ social.label }}
        </a>
      </li>
    </ul>
    <span class="mt-md col-start-11 col-end-13 text-xs">Clients</span>
    <ul>
      <li />
    </ul>
    <div class="mt-xl col-start-1 col-end-5 text-sm">
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
