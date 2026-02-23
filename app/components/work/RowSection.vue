<script lang="ts" setup>
import Row from "./Row.vue";
import RowLabelList from "./RowLabelList.vue";
import RowLinks from "./RowLinks.vue";
import RowListParent from "./RowListParent.vue";
import RowWorksDone from "./RowWorksDone.vue";

type Link = { label: string; link: string };

type WorkProjectPage = {
  name: string;
  date: string;
  role: string;
  websiteLink: string;
  linkedinLink?: string;
  worksDone?: Link[];
  stack: string[];
  description: string[];
};

defineProps<{
  work: WorkProjectPage;
}>();
</script>

<template>
  <div class="top-xl pb-sm w-full text-sm lg:w-5/12">
    <Row :value="work.name" class-name="animate-fadeInUp" label="Company" />
    <Row :value="work.date" class-name="animate-fadeInUp [animation-delay:100ms]" label="Date" />
    <Row :value="work.role" class-name="animate-fadeInUp [animation-delay:200ms]" label="Role" />
    <RowLinks
      :linkedin="work.linkedinLink"
      :website="work.websiteLink"
      class-name="animate-fadeInUp [animation-delay:300ms]"
    />
    <RowWorksDone
      v-if="work.worksDone?.length"
      :works-done="work.worksDone"
      class-name="animate-fadeInUp [animation-delay:400ms]"
    />
    <RowLabelList :stack="work.stack" class-name="animate-fadeInUp [animation-delay:500ms]" />
    <RowListParent
      :description="work.description"
      class-name="animate-fadeInUp [animation-delay:600ms]"
    />
  </div>
</template>
