<script lang="ts" setup>
import type { WorkCard } from "~/domain/works/types";

const props = defineProps<{ work: WorkCard; index: number }>();

const emit = defineEmits<{
  register: [
    payload: { index: number; card: HTMLElement; image: HTMLImageElement; clients: HTMLElement[] },
  ];
  hoverIn: [index: number];
  hoverOut: [];
  imageClick: [event: MouseEvent, index: number];
}>();

const cardEl = ref<HTMLElement | null>(null);
const imageEl = ref<HTMLImageElement | null>(null);
const clientEls = ref<HTMLElement[]>([]);

function setClientRef(el: Element | null) {
  if (!el) return;
  clientEls.value.push(el as HTMLElement);
}

onMounted(() => {
  if (!cardEl.value || !imageEl.value) return;
  emit("register", {
    index: props.index,
    card: cardEl.value,
    image: imageEl.value,
    clients: clientEls.value,
  });
});
</script>

<template>
  <li ref="cardEl" class="work-item w-96 lg:w-130 xl:w-160 3xl:w-230 shrink-0 pl-2.5 list-none">
    <div
      class="md:h-130 lg:h-96 h-110 w-full cursor-pointer overflow-hidden"
      @click="emit('imageClick', $event, index)"
      @mouseenter="emit('hoverIn', index)"
      @mouseleave="emit('hoverOut')"
    >
      <img
        ref="imageEl"
        :alt="work.title"
        :src="work.image"
        class="work-img h-full w-full object-cover object-top"
        draggable="false"
      />
    </div>
    <div
      class="flex flex-row justify-between items-end p-2.5 pb-1 text-foreground font-semibold text-sm uppercase"
    >
      <div class="flex flex-col">
        <div class="clients hidden lg:flex flex-col gap-1">
          <template v-for="client in work.clients.slice(0, 3)" :key="client">
            <span :ref="setClientRef" class="client-item text-xs opacity-0 text-foreground-muted">
              {{ client }}
            </span>
          </template>
        </div>
      </div>
    </div>
  </li>
</template>
