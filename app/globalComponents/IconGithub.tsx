"use client";

import { FC } from "react";
import { useIconDimensionStore, useThemeStore } from "../../utils/store";

const IconGithub: FC = () => {
  const { activeTheme } = useThemeStore();
  const { normal } = useIconDimensionStore();
  return (
    <svg
      width={normal}
      height={normal}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.9931 0.315327C10.6795 1.53144 6.32406 4.55382 3.32754 9.13211C-1.91638 17.1978 -0.871084 28.0176 5.81883 34.9208C7.82233 36.9953 10.8711 38.9983 13.1708 39.7673C14.0244 40.0534 14.129 40.0534 14.5122 39.7852C14.9304 39.499 14.9478 39.4275 14.9478 37.3709V35.2605L13.4147 35.35C11.6202 35.4394 10.2265 35.1175 9.39027 34.3842C9.09411 34.1339 8.51919 33.2754 8.11849 32.4885C7.45647 31.1651 6.96866 30.5571 5.60977 29.3231C5.15681 28.9117 5.13939 28.8939 5.45298 28.6614C6.20211 28.0891 7.7178 28.6435 8.67599 29.8238C10.3485 31.9162 10.9931 32.4707 11.9513 32.6853C12.8049 32.8641 13.5889 32.7926 14.7736 32.4349C14.9304 32.3812 15.1394 32.0057 15.244 31.5765C15.3485 31.1651 15.6272 30.5392 15.8537 30.1994L16.2718 29.5735L14.8607 29.2873C11.899 28.6614 10.0697 27.5705 8.86763 25.7105C7.75264 23.9937 7.38678 22.5093 7.36936 19.7373C7.36936 17.1262 7.64811 16.0532 8.74567 14.5867C9.23348 13.9429 9.28574 13.7462 9.14637 13.3706C8.88505 12.7268 8.95473 10.0084 9.23348 9.18576C9.45996 8.57771 9.58191 8.47041 10.0523 8.41675C10.8363 8.32733 12.2997 8.84597 13.7805 9.7044L15.0523 10.4555L16.1673 10.1873C17.7527 9.8117 22.5088 9.82958 23.9374 10.1873L25.0175 10.4734L26.028 9.84747C27.3694 9.02481 29.0768 8.38099 29.9304 8.38099C30.6099 8.38099 30.6099 8.39887 30.8886 9.31095C31.1848 10.3661 31.237 12.2797 30.9757 13.1918C30.8363 13.7283 30.8712 13.8892 31.2545 14.4079C33.1534 16.9832 33.3625 21.2574 31.7597 24.7627C30.6795 27.0697 28.3973 28.6793 25.3311 29.2694L23.8677 29.5556L24.4077 30.5392L24.9652 31.5407L25.0175 35.5288L25.0872 39.5169L25.5227 39.8031C25.9234 40.0713 26.0105 40.0713 26.8468 39.7673C28.2405 39.2844 30.6273 37.961 31.9339 36.9416C39.704 30.9684 42.2127 20.2559 37.9095 11.3497C35.3834 6.10973 30.6099 2.08584 25.1395 0.583588C22.7527 -0.0602341 18.2579 -0.203304 15.9931 0.315327Z"
        fill={activeTheme === "dark" ? "#e7e7e7" : "#09090B"}
      />
    </svg>
  );
};

export default IconGithub;
