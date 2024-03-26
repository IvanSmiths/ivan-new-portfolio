import { FC } from "react";
import { ThemeColors, ThemeMode, useThemeStore } from "../../utils/store";

const Logo: FC = () => {
  const { activeTheme } = useThemeStore();
  return (
    <svg
      id="logo"
      viewBox="0 0 1400 315"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 4.375H47.979V310.625H0V4.375ZM53.8162 4.375H102.232L133.636 241.938H134.508L165.913 4.375H209.966L163.732 310.625H100.051L53.8162 4.375ZM240.287 4.375H305.277L355 310.625H307.021L298.298 249.813V250.688H243.776L235.053 310.625H190.563L240.287 4.375ZM292.628 209.125L271.255 57.75H270.383L249.447 209.125H292.628ZM360.831 4.375H421.022L467.693 187.688H468.565V4.375H511.31V310.625H462.023L404.448 87.0625H403.576V310.625H360.831V4.375ZM591.896 315C568.634 315 551.041 308.438 539.119 295.313C527.197 281.896 521.236 262.792 521.236 238V220.5H566.598V241.5C566.598 261.333 574.885 271.25 591.46 271.25C599.602 271.25 605.708 268.917 609.779 264.25C614.141 259.292 616.322 251.417 616.322 240.625C616.322 227.792 613.413 216.563 607.598 206.938C601.783 197.021 591.024 185.208 575.321 171.5C555.549 154 541.736 138.25 533.885 124.25C526.034 109.958 522.108 93.9167 522.108 76.125C522.108 51.9167 528.215 33.25 540.428 20.125C552.64 6.70834 570.378 0 593.641 0C616.613 0 633.913 6.70834 645.545 20.125C657.467 33.25 663.428 52.2083 663.428 77V89.6875H618.066V73.9375C618.066 63.4375 616.03 55.8542 611.96 51.1875C607.889 46.2292 601.928 43.75 594.077 43.75C578.083 43.75 570.087 53.5208 570.087 73.0625C570.087 84.1458 572.995 94.5 578.811 104.125C584.917 113.75 595.821 125.417 611.524 139.125C631.588 156.625 645.4 172.521 652.96 186.813C660.52 201.105 664.3 217.875 664.3 237.125C664.3 262.208 658.049 281.458 645.545 294.875C633.332 308.292 615.449 315 591.896 315ZM674.363 4.375H742.843L773.375 223.563H774.247L804.779 4.375H873.258V310.625H827.896V78.75H827.024L792.13 310.625H752.002L717.108 78.75H716.236V310.625H674.363V4.375ZM891.614 4.375H939.593V310.625H891.614V4.375ZM995.59 48.125H945.431V4.375H1093.73V48.125H1043.57V310.625H995.59V48.125ZM1099.51 4.375H1147.49V129.063H1198.96V4.375H1246.94V310.625H1198.96V172.813H1147.49V310.625H1099.51V4.375ZM1327.59 315C1304.33 315 1286.75 308.438 1274.82 295.313C1262.9 281.896 1256.93 262.792 1256.93 238V220.5H1302.3V241.5C1302.3 261.333 1310.58 271.25 1327.16 271.25C1335.3 271.25 1341.41 268.917 1345.48 264.25C1349.84 259.292 1352.02 251.417 1352.02 240.625C1352.02 227.792 1349.11 216.563 1343.3 206.938C1337.49 197.021 1326.72 185.208 1311.02 171.5C1291.25 154 1277.43 138.25 1269.59 124.25C1261.74 109.958 1257.8 93.9167 1257.8 76.125C1257.8 51.9167 1263.92 33.25 1276.13 20.125C1288.34 6.70834 1306.08 0 1329.34 0C1352.31 0 1369.62 6.70834 1381.24 20.125C1393.17 33.25 1399.13 52.2083 1399.13 77V89.6875H1353.76V73.9375C1353.76 63.4375 1351.73 55.8542 1347.66 51.1875C1343.59 46.2292 1337.63 43.75 1329.77 43.75C1313.79 43.75 1305.78 53.5208 1305.78 73.0625C1305.78 84.1458 1308.69 94.5 1314.51 104.125C1320.62 113.75 1331.52 125.417 1347.22 139.125C1367.29 156.625 1381.1 172.521 1388.66 186.813C1396.22 201.105 1400 217.875 1400 237.125C1400 262.208 1393.75 281.458 1381.24 294.875C1368.03 308.292 1351.15 315 1327.59 315Z"
        fill={
          activeTheme === ThemeMode.DARK ? ThemeColors.DARK : ThemeColors.LIGHT
        }
      />
    </svg>
  );
};

export default Logo;
