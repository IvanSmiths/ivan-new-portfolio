"use client";

import { FC } from "react";
import { ThemeColors, ThemeMode, useThemeStore } from "../../../utils/store";

const Logo: FC = () => {
  const { activeTheme } = useThemeStore();

  const theme =
    activeTheme === ThemeMode.Dark ? ThemeColors.Dark : ThemeColors.Light;

  return (
    <svg
      data-cy="logo"
      viewBox="0 0 1880 374"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 5.19444H64.4289V368.806H0V5.19444ZM72.2675 5.19444H137.282L179.454 287.253H180.625L222.797 5.19444H281.954L219.868 368.806H134.354L72.2675 5.19444ZM322.671 5.19444H409.943L476.715 368.806H412.286L400.572 296.603V297.642H327.357L315.643 368.806H255.899L322.671 5.19444ZM392.957 248.294L364.257 68.5667H363.086L334.971 248.294H392.957ZM484.544 5.19444H565.373L628.045 222.842H629.216V5.19444H686.616V368.806H620.43L543.116 103.369H541.944V368.806H484.544V5.19444ZM794.832 374C763.594 374 739.969 366.208 723.96 350.625C707.951 334.695 699.945 312.013 699.945 282.578V261.8H760.86V286.733C760.86 310.281 771.989 322.056 794.246 322.056C805.18 322.056 813.38 319.286 818.846 313.744C824.703 307.858 827.632 298.508 827.632 285.694C827.632 270.458 823.727 257.125 815.917 245.697C808.108 233.923 793.66 219.898 772.574 203.622C746.022 182.844 727.474 164.144 716.931 147.522C706.388 130.553 701.117 111.507 701.117 90.3834C701.117 61.6408 709.317 39.4778 725.717 23.8945C742.117 7.96482 765.937 0 797.175 0C828.023 0 851.255 7.96482 866.875 23.8945C882.884 39.4778 890.889 61.987 890.889 91.4222V106.486H829.975V87.7861C829.975 75.3195 827.241 66.3158 821.775 60.775C816.308 54.888 808.303 51.9445 797.76 51.9445C776.284 51.9445 765.546 63.5454 765.546 86.7472C765.546 99.9065 769.451 112.2 777.26 123.628C785.46 135.056 800.103 148.908 821.189 165.183C848.132 185.961 866.68 204.834 876.832 221.803C886.984 238.772 892.061 258.683 892.061 281.539C892.061 311.32 883.666 334.176 866.875 350.106C850.475 366.036 826.46 374 794.832 374ZM905.574 5.19444H997.531L1038.53 265.436H1039.7L1080.7 5.19444H1172.66V368.806H1111.75V93.5H1110.57L1063.72 368.806H1009.83L962.974 93.5H961.803V368.806H905.574V5.19444ZM1197.31 5.19444H1261.74V368.806H1197.31V5.19444ZM1336.94 57.1389H1269.58V5.19444H1468.72V57.1389H1401.36V368.806H1336.94V57.1389ZM1476.49 5.19444H1540.92V153.236H1610.03V5.19444H1674.46V368.806H1610.03V205.181H1540.92V368.806H1476.49V5.19444ZM1782.77 374C1751.53 374 1727.92 366.208 1711.9 350.625C1695.89 334.695 1687.88 312.013 1687.88 282.578V261.8H1748.8V286.733C1748.8 310.281 1760.57 322.056 1782.19 322.056C1793.12 322.056 1801.32 319.286 1806.79 313.744C1812.64 307.858 1815.57 298.508 1815.57 285.694C1815.57 270.458 1811.66 257.125 1803.86 245.697C1796.05 233.923 1781.6 219.898 1760.52 203.622C1733.96 182.844 1715.41 164.144 1704.88 147.522C1694.33 130.553 1689.05 111.507 1689.05 90.3834C1689.05 61.6408 1697.26 39.4778 1713.66 23.8945C1730.05 7.96482 1753.88 0 1785.12 0C1815.96 0 1839.2 7.96482 1854.81 23.8945C1870.82 39.4778 1878.83 61.987 1878.83 91.4222V106.486H1817.91V87.7861C1817.91 75.3195 1815.18 66.3158 1809.71 60.775C1804.25 54.888 1796.24 51.9445 1785.69 51.9445C1764.23 51.9445 1753.48 63.5454 1753.48 86.7472C1753.48 99.9065 1757.39 112.2 1765.19 123.628C1773.4 135.056 1788.05 148.908 1809.12 165.183C1836.07 185.961 1854.62 204.834 1864.77 221.803C1874.92 238.772 1880 258.683 1880 281.539C1880 311.32 1871.6 334.176 1854.81 350.106C1837.07 366.036 1814.4 374 1782.77 374Z"
        fill={theme}
      />
    </svg>
  );
};

export default Logo;
