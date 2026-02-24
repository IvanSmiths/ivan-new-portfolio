<script lang="ts" setup>
import type { WorkCard } from "~/domain/works/types";
import type { ComponentPublicInstance } from "vue";

const props = defineProps<{ work: WorkCard }>();

const emit = defineEmits<{
  register: [
    payload: {
      id: string;
      card: HTMLElement;
      image: HTMLImageElement;
      clients: HTMLElement[];
    },
  ];
  unregister: [id: string];
  hoverIn: [id: string];
  hoverOut: [];
  imageClick: [event: MouseEvent, id: string];
}>();

const cardRef = ref<HTMLElement | null>(null);
const imageContainerRef = ref<HTMLImageElement | null>(null);
const imageRef = ref<HTMLImageElement | null>(null);
const clientRefs = ref<HTMLElement[]>([]);

function setClientRefAt(i: number) {
  return (el: Element | ComponentPublicInstance | null) => {
    if (el && el instanceof HTMLElement) clientRefs.value[i] = el;
  };
}

watch(
  () => props.work.clients,
  () => {
    clientRefs.value = [];
  },
  { deep: true },
);

onMounted(() => {
  if (!cardRef.value || !imageRef.value) return;

  emit("register", {
    id: props.work.slug,
    card: cardRef.value,
    image: imageRef.value,
    clients: clientRefs.value,
  });
});

onBeforeUnmount(() => {
  emit("unregister", props.work.slug);
});
</script>

<template>
  <li ref="cardRef" class="work-item 3xl:w-230 w-96 shrink-0 list-none lg:w-130 xl:w-160">
    <div
      ref="imageContainerRef"
      class="h-110 w-full cursor-pointer overflow-hidden md:h-130 lg:h-96"
      @click="emit('imageClick', $event, work.slug)"
      @mouseenter="emit('hoverIn', work.slug)"
      @mouseleave="emit('hoverOut')"
    >
      <img
        ref="imageRef"
        :alt="work.title"
        :src="work.image"
        class="work-img h-full w-full object-cover object-top"
        draggable="false"
      />
    </div>

    <div
      class="text-foreground flex flex-row items-end justify-between p-2.5 pb-1 text-sm font-semibold uppercase"
    >
      <div class="flex flex-col">
        <div class="clients hidden flex-col gap-1 lg:flex">
          <template v-for="(client, i) in work.clients.slice(0, 3)" :key="client">
            <span
              :ref="setClientRefAt(i)"
              class="client-item text-foreground-muted text-xs opacity-0"
            >
              {{ client }}
            </span>
          </template>
        </div>
      </div>
    </div>
  </li>
</template>
