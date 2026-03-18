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
  volumeDb: -22,
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
    <svg viewBox="0 0 1512 303" width="100%" xmlns="http://www.w3.org/2000/svg">
      <g ref="lettersRef">
        <g>
          <path
            class="fill-foreground"
            d="M1359.77 0H1512V78.1714H1406.96C1406.96 82.5143 1407.13 85.12 1407.47 85.9886C1407.81 86.5676 1409.24 86.8572 1411.78 86.8572H1512V197.6C1512 218.735 1511.75 236.107 1511.24 249.714C1510.9 263.032 1509.8 273.455 1507.94 280.983C1506.08 288.51 1502.95 293.867 1498.55 297.051C1494.16 300.236 1488.07 302.263 1480.29 303.131C1472.5 303.711 1462.36 304 1449.84 304H1359.77V173.714H1459.99C1462.53 173.714 1463.96 173.425 1464.3 172.846C1464.64 171.977 1464.81 169.371 1464.81 165.029H1359.77V0Z"
          />
        </g>
        <g>
          <path
            class="fill-foreground"
            d="M1197.48 0H1273.59V95.5429C1273.59 99.0171 1273.68 101.333 1273.85 102.491C1274.19 103.36 1274.95 103.939 1276.13 104.229H1278.67V0H1292.62C1304.97 0 1315.03 0.434282 1322.82 1.30286C1330.76 1.8819 1336.94 3.76381 1341.34 6.94859C1345.73 10.1333 1348.86 15.4895 1350.72 23.0172C1352.58 30.5448 1353.68 40.9676 1354.02 54.2857C1354.53 67.6038 1354.78 84.9752 1354.78 106.4V304H1278.67V182.4C1278.67 178.926 1278.58 176.754 1278.41 175.886C1278.25 174.728 1277.48 174.004 1276.13 173.714H1273.59V304H1197.48V0Z"
          />
        </g>
        <g>
          <path
            class="fill-foreground"
            d="M1159.4 304H1083.29V260.571H1050.3V0H1192.38V260.571H1159.4V304Z"
          />
        </g>
        <g>
          <path class="fill-foreground" d="M969.034 304V0H1045.15V304H969.034Z" />
        </g>
        <g>
          <path
            class="fill-foreground"
            d="M801.59 86.8572V304H725.475V0H901.809C914.156 0 924.22 0.434282 932.001 1.30286C939.951 1.8819 946.125 3.76381 950.522 6.94859C954.92 10.1333 958.049 15.4895 959.91 23.0172C961.771 30.5448 962.87 40.9676 963.208 54.2857C963.716 67.6038 963.969 84.9752 963.969 106.4V304H887.854V95.5429C887.854 91.2 887.6 88.739 887.093 88.16C886.755 87.2914 885.317 86.8572 882.78 86.8572V304H806.664V95.5429C806.664 91.2 806.411 88.739 805.903 88.16C805.565 87.2914 804.127 86.8572 801.59 86.8572Z"
          />
        </g>
        <g>
          <path
            class="fill-foreground"
            d="M568.14 0H720.37V78.1714H615.331C615.331 82.5143 615.5 85.12 615.839 85.9886C616.177 86.5676 617.615 86.8572 620.152 86.8572H720.37V197.6C720.37 218.735 720.117 236.107 719.609 249.714C719.271 263.032 718.172 273.455 716.311 280.983C714.45 288.51 711.321 293.867 706.923 297.051C702.526 300.236 696.436 302.263 688.656 303.131C680.875 303.711 670.726 304 658.21 304H568.14V173.714H668.358C670.895 173.714 672.333 173.425 672.671 172.846C673.01 171.977 673.179 169.371 673.179 165.029H568.14V0Z"
          />
        </g>
        <g>
          <path
            class="fill-foreground"
            d="M405.85 0H500.994C513.341 0 523.406 0.434282 531.186 1.30286C539.136 1.8819 545.31 3.76381 549.708 6.94859C554.105 10.1333 557.235 15.4895 559.095 23.0172C560.956 30.5448 562.055 40.9676 562.394 54.2857C562.901 67.6038 563.155 84.9752 563.155 106.4V304H487.039V95.5429C487.039 92.0686 486.955 89.8972 486.786 89.0286C486.616 87.8705 485.855 87.1467 484.502 86.8572H481.965V304H405.85V0Z"
          />
        </g>
        <g>
          <path
            class="fill-foreground"
            d="M400.865 0V304H324.749V173.714H319.675V304H243.56V106.4C243.56 84.9752 243.729 67.6038 244.067 54.2857C244.574 40.9676 245.758 30.5448 247.619 23.0172C249.48 15.4895 252.609 10.1333 257.007 6.94859C261.404 3.76381 267.494 1.8819 275.274 1.30286C283.224 0.434282 293.373 0 305.72 0H400.865ZM319.675 130.286H324.749V86.8572C322.212 86.8572 320.69 87.2914 320.182 88.16C319.844 88.739 319.675 91.2 319.675 95.5429V130.286Z"
          />
        </g>
        <g>
          <path
            class="fill-foreground"
            d="M143.429 304C131.082 304 120.933 303.711 112.983 303.131C105.203 302.263 99.1134 300.236 94.7156 297.051C90.3178 293.867 87.1886 288.51 85.328 280.983C83.4674 273.455 82.2834 263.032 81.776 249.714C81.4377 236.107 81.2686 218.735 81.2686 197.6V0H157.384V165.029C157.384 168.503 157.468 170.819 157.638 171.977C157.976 172.846 158.737 173.425 159.921 173.714H162.458V0H238.574V197.6C238.574 218.735 238.32 236.107 237.812 249.714C237.474 263.032 236.375 273.455 234.514 280.983C232.654 288.51 229.524 293.867 225.127 297.051C220.729 300.236 214.64 302.263 206.859 303.131C199.078 303.711 188.93 304 176.413 304H143.429Z"
          />
        </g>
        <g>
          <path class="fill-foreground" d="M0 304V0H76.1154V304H0Z" />
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped></style>
