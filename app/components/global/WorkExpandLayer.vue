<script lang="ts" setup>
import { useCardExpandLayer } from "~/composables/animations/home/useCardExpandLayer";

const { layerRef, coverRef, stageRef, labelRef, roleRef } = useCardExpandLayer();
</script>

<template>
  <div
    ref="layerRef"
    aria-hidden="true"
    class="pointer-events-none invisible fixed inset-0 z-[998] flex items-center justify-center"
  >
    <div ref="coverRef" class="bg-background absolute inset-0 z-0 opacity-0" />
    <div
      ref="stageRef"
      class="absolute top-1/2 left-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
    />
    <div
      ref="labelRef"
      class="absolute top-1/2 left-1/2 z-[2] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-0"
    >
      <span
        ref="roleRef"
        class="text-foreground block max-w-full overflow-hidden text-center text-[clamp(0.875rem,1.3vw,1.1rem)] tracking-[0.08em] text-ellipsis whitespace-nowrap uppercase"
      />
    </div>
  </div>
</template>
