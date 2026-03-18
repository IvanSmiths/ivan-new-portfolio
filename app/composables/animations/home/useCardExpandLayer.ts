import { ref } from "vue";

const layerRef = ref<HTMLDivElement | null>(null);
const coverRef = ref<HTMLDivElement | null>(null);
const stageRef = ref<HTMLDivElement | null>(null);
const labelRef = ref<HTMLDivElement | null>(null);
const roleRef = ref<HTMLSpanElement | null>(null);

export function useCardExpandLayer() {
  return {
    layerRef,
    coverRef,
    stageRef,
    labelRef,
    roleRef,
  };
}
