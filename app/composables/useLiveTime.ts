import { onMounted, onUnmounted, ref } from "vue";

type UseLiveTimeOptions = {
  locale?: string;
  timeZone?: string;
  intervalMs?: number;
  format?: Intl.DateTimeFormatOptions;
};

export function useLiveTime(options: UseLiveTimeOptions = {}) {
  const {
    locale = "it-IT",
    timeZone = "Europe/Rome",
    intervalMs = 1000,
    format = { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Rome" },
  } = options;

  const currentTime = ref("");

  let timer: ReturnType<typeof setInterval> | null = null;

  const tick = () => {
    const now = new Date();
    currentTime.value = now.toLocaleTimeString(locale, {
      ...format,
      timeZone,
    });
  };

  onMounted(() => {
    tick();
    timer = setInterval(tick, intervalMs);
  });

  onUnmounted(() => {
    if (timer) clearInterval(timer);
    timer = null;
  });

  return { currentTime };
}
