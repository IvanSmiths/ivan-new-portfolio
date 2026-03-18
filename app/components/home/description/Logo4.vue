<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { useCardsLoopTone } from "~/composables/animations/home/useCardsLoopTone";
import { useLogoHover } from "~/composables/animations/home/useLogoHover";
import { useLogoReveal } from "~/composables/animations/home/useLogoReveal";
import { useLoaderSession } from "~/composables/sessions/useLoaderSession";

const lettersRef = ref<SVGGElement | null>(null);
const logoHoverTone = useCardsLoopTone({
  duration: "64n",
  snapFrequency: "C5",
  volumeDb: -12,
});
const hoverAnimation = useLogoHover(lettersRef, {
  onHover: ({ index, total }) => {
    const progress = total <= 1 ? 0.5 : index / (total - 1);
    const semitoneRange = 14;
    const semitones = Math.round((progress - 0.5) * semitoneRange);
    logoHoverTone.playSnapBlipTransposed(semitones);
  },
});
const revealAnimation = useLogoReveal(lettersRef);
const { hasSeenLoader, syncSeenFromStorage, onLoaderDone } = useLoaderSession();
const isLogoVisible = ref(hasSeenLoader());

let stopLoaderDoneListener: (() => void) | null = null;

onMounted(async () => {
  await nextTick();
  syncSeenFromStorage();
  isLogoVisible.value = hasSeenLoader();

  logoHoverTone.ensureSnapSynth();
  logoHoverTone.installAudioUnlockListeners();
  hoverAnimation.setup();
  revealAnimation.init();

  if (isLogoVisible.value) return;

  stopLoaderDoneListener = onLoaderDone(() => {
    isLogoVisible.value = true;
  });
});

onBeforeUnmount(() => {
  stopLoaderDoneListener?.();
  stopLoaderDoneListener = null;
});
</script>

<template>
  <div
    :class="isLogoVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'"
    class="transition-opacity duration-300"
    data-home-logo
  >
    <svg viewBox="0 0 1472 173" width="100%" xmlns="http://www.w3.org/2000/svg">
      <g ref="lettersRef">
        <g>
          <path
            class="fill-foreground"
            d="M1323.8 0H1472V44.46H1369.74C1369.74 46.93 1369.9 48.412 1370.23 48.906C1370.56 49.2353 1371.96 49.4 1374.43 49.4H1472V112.385C1472 124.406 1471.75 134.286 1471.26 142.025C1470.93 149.6 1469.86 155.528 1468.05 159.809C1466.24 164.09 1463.19 167.137 1458.91 168.948C1454.63 170.759 1448.7 171.912 1441.12 172.406C1433.55 172.735 1423.67 172.9 1411.48 172.9H1323.8V98.8H1421.36C1423.83 98.8 1425.23 98.6353 1425.56 98.306C1425.89 97.812 1426.06 96.33 1426.06 93.86H1323.8V0Z"
          />
        </g>
        <g>
          <path
            class="fill-foreground"
            d="M1165.8 0H1239.9V54.34C1239.9 56.316 1239.98 57.6333 1240.15 58.292C1240.48 58.786 1241.22 59.1153 1242.37 59.28H1244.84V0H1258.43C1270.45 0 1280.25 0.247001 1287.82 0.741005C1295.56 1.07033 1301.57 2.14066 1305.85 3.952C1310.13 5.76333 1313.18 8.80967 1314.99 13.091C1316.8 17.3723 1317.87 23.3003 1318.2 30.875C1318.7 38.4497 1318.94 48.3297 1318.94 60.515V172.9H1244.84V103.74C1244.84 101.764 1244.76 100.529 1244.59 100.035C1244.43 99.3763 1243.69 98.9647 1242.37 98.8H1239.9V172.9H1165.8V0Z"
          />
        </g>
        <g>
          <path
            class="fill-foreground"
            d="M1128.73 172.9H1054.63V148.2H1022.52V0H1160.84V148.2H1128.73V172.9Z"
          />
        </g>
        <g>
          <path class="fill-foreground" d="M943.398 172.9V0H1017.5V172.9H943.398Z" />
        </g>
        <g>
          <path
            class="fill-foreground"
            d="M780.384 49.4V172.9H706.282V0H877.951C889.972 0 899.77 0.247001 907.345 0.741005C915.084 1.07033 921.095 2.14066 925.376 3.952C929.658 5.76333 932.704 8.80967 934.516 13.091C936.327 17.3723 937.397 23.3003 937.727 30.875C938.221 38.4497 938.468 48.3297 938.468 60.515V172.9H864.366V54.34C864.366 51.87 864.119 50.4703 863.625 50.141C863.296 49.647 861.896 49.4 859.426 49.4V172.9H785.324V54.34C785.324 51.87 785.077 50.4703 784.583 50.141C784.254 49.647 782.854 49.4 780.384 49.4Z"
          />
        </g>
        <g>
          <path
            class="fill-foreground"
            d="M553.109 0H701.313V44.46H599.052C599.052 46.93 599.217 48.412 599.546 48.906C599.876 49.2353 601.276 49.4 603.746 49.4H701.313V112.385C701.313 124.406 701.066 134.286 700.572 142.025C700.243 149.6 699.172 155.528 697.361 159.809C695.549 164.09 692.503 167.137 688.222 168.948C683.94 170.759 678.012 171.912 670.437 172.406C662.862 172.735 652.982 172.9 640.796 172.9H553.109V98.8H650.677C653.147 98.8 654.546 98.6353 654.876 98.306C655.205 97.812 655.37 96.33 655.37 93.86H553.109V0Z"
          />
        </g>
        <g>
          <path
            class="fill-foreground"
            d="M395.112 0H487.739C499.76 0 509.558 0.247001 517.133 0.741005C524.873 1.07033 530.883 2.14066 535.165 3.952C539.446 5.76333 542.492 8.80967 544.304 13.091C546.115 17.3723 547.186 23.3003 547.515 30.875C548.009 38.4497 548.256 48.3297 548.256 60.515V172.9H474.154V54.34C474.154 52.364 474.072 51.129 473.907 50.635C473.742 49.9763 473.001 49.5647 471.684 49.4H469.214V172.9H395.112V0Z"
          />
        </g>
        <g>
          <path
            class="fill-foreground"
            d="M390.26 0V172.9H316.158V98.8H311.218V172.9H237.116V60.515C237.116 48.3297 237.281 38.4497 237.61 30.875C238.104 23.3003 239.257 17.3723 241.068 13.091C242.88 8.80967 245.926 5.76333 250.208 3.952C254.489 2.14066 260.417 1.07033 267.992 0.741005C275.731 0.247001 285.612 0 297.633 0H390.26ZM311.218 74.1H316.158V49.4C313.688 49.4 312.206 49.647 311.712 50.141C311.383 50.4703 311.218 51.87 311.218 54.34V74.1Z"
          />
        </g>
        <g>
          <path
            class="fill-foreground"
            d="M139.636 172.9C127.615 172.9 117.734 172.735 109.995 172.406C102.42 171.912 96.4919 170.759 92.2104 168.948C87.929 167.137 84.8826 164.09 83.0712 159.809C81.2599 155.528 80.1072 149.6 79.6131 142.025C79.2838 134.286 79.1191 124.406 79.1191 112.385V0H153.221V93.86C153.221 95.836 153.303 97.1533 153.468 97.812C153.797 98.306 154.538 98.6353 155.691 98.8H158.161V0H232.263V112.385C232.263 124.406 232.016 134.286 231.522 142.025C231.192 149.6 230.122 155.528 228.311 159.809C226.499 164.09 223.453 167.137 219.171 168.948C214.89 170.759 208.962 171.912 201.387 172.406C193.812 172.735 183.932 172.9 171.746 172.9H139.636Z"
          />
        </g>
        <g>
          <path class="fill-foreground" d="M0 172.9V0H74.1017V172.9H0Z" />
        </g>
      </g>
    </svg>
  </div>
</template>
