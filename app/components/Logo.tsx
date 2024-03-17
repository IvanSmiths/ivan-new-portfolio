import { FC } from "react";
import { useThemeStore } from "../../utils/store";

const Logo: FC = () => {
  const { activeTheme } = useThemeStore();
  return (
    <svg
      width="1400"
      height="305"
      viewBox="0 0 1400 305"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y="278"
        width="1400"
        height="27"
        fill={activeTheme === "dark" ? "#e7e7e7" : "#09090B"}
      />
      <rect
        width="1400"
        height="27"
        fill={activeTheme === "dark" ? "#e7e7e7" : "#09090B"}
      />
      <path
        d="M0 258.347V47.8897H33.201V258.347H0ZM123.775 186.666L165.033 47.8897H200.178L137.666 258.347H109.883L47.3704 47.8897H82.5162L123.775 186.666ZM250.188 169.441H289.501L269.914 101.511L250.188 169.441ZM190.454 258.347L250.466 47.8897H286.862L346.874 258.347H314.784L297.42 197.363H242.27L224.905 258.347H190.454ZM474.537 177.081V47.8897H507.599V258.347H481.205L396.189 96.927V258.347H363.127V47.8897H405.913L474.537 177.081ZM527.187 204.448L553.858 195.696C553.951 195.696 554.136 196.39 554.414 197.78C554.692 199.169 555.155 201.021 555.803 203.336C556.544 205.559 557.517 208.059 558.721 210.838C560.017 213.523 561.869 216.255 564.277 219.034C566.685 221.719 569.51 224.174 572.751 226.396C579.975 231.49 588.958 234.037 599.701 234.037C610.444 234.037 618.316 231.397 623.317 226.118C628.41 220.84 630.957 214.588 630.957 207.365C630.957 200.049 630.216 194.168 628.734 189.722C627.252 185.185 624.659 181.249 620.955 177.915C614.75 172.358 604.007 167.357 588.726 162.912C561.777 155.04 544.459 142.862 536.772 126.377C532.79 117.764 530.798 107.624 530.798 95.9546C530.798 86.1378 534.271 76.5526 541.217 67.199C553.349 51.733 570.575 44 592.894 44C610.583 44 625.076 49.3251 636.375 59.9753C644.432 67.4768 650.451 76.9231 654.434 88.3142L657.073 95.6767C657.907 97.8994 658.462 99.3349 658.74 99.9831L631.651 109.568C625.539 90.1201 616 78.127 603.035 73.5891C599.793 72.4778 596.413 71.9221 592.894 71.9221C573.631 71.9221 563.999 81.8314 563.999 101.65C563.999 110.726 566.685 117.672 572.056 122.488C576.502 126.655 582.336 129.943 589.56 132.351L596.228 134.573C600.025 135.87 602.109 136.564 602.479 136.657L608.591 138.741C624.428 144.297 635.124 149.205 640.681 153.465C648.831 159.763 654.156 165.551 656.656 170.83C661.657 181.665 664.158 193.103 664.158 205.142C664.158 214.588 661.472 224.174 656.101 233.898C648.877 246.956 637.44 255.522 621.788 259.597C615.769 261.172 609.193 261.959 602.062 261.959C594.931 261.959 588.217 261.311 581.92 260.014C575.715 258.717 570.343 256.958 565.805 254.735C561.267 252.513 557.1 249.966 553.303 247.095C549.506 244.224 546.311 241.214 543.718 238.065C541.125 234.824 538.856 231.629 536.911 228.48C534.966 225.239 533.392 222.183 532.188 219.312C531.076 216.441 530.15 213.894 529.409 211.671C528.668 209.449 528.113 207.689 527.742 206.392C527.464 205.096 527.279 204.448 527.187 204.448ZM717.224 115.82V258.347H684.717V47.8897H729.726L770.151 193.334H771.54L811.964 47.8897H856.973V258.347H824.328V115.82H823.078L783.626 258.347H758.065L718.613 115.82H717.224ZM887.674 258.347V47.8897H920.875V258.347H887.674ZM935.044 75.8118V47.8897H1081.87V75.8118H1025.06V258.347H991.861V75.8118H935.044ZM1099.38 258.347V47.8897H1132.58V133.879H1209.26V47.8897H1242.46V258.347H1209.26V161.8H1132.58V258.347H1099.38ZM1262.88 204.448L1289.55 195.696C1289.65 195.696 1289.83 196.39 1290.11 197.78C1290.39 199.169 1290.85 201.021 1291.5 203.336C1292.24 205.559 1293.21 208.059 1294.41 210.838C1295.71 213.523 1297.56 216.255 1299.97 219.034C1302.38 221.719 1305.2 224.174 1308.45 226.396C1315.67 231.49 1324.65 234.037 1335.39 234.037C1346.14 234.037 1354.01 231.397 1359.01 226.118C1364.1 220.84 1366.65 214.588 1366.65 207.365C1366.65 200.049 1365.91 194.168 1364.43 189.722C1362.95 185.185 1360.35 181.249 1356.65 177.915C1350.44 172.358 1339.7 167.357 1324.42 162.912C1297.47 155.04 1280.15 142.862 1272.47 126.377C1268.48 117.764 1266.49 107.624 1266.49 95.9546C1266.49 86.1378 1269.97 76.5526 1276.91 67.199C1289.04 51.733 1306.27 44 1328.59 44C1346.28 44 1360.77 49.3251 1372.07 59.9753C1380.13 67.4768 1386.15 76.9231 1390.13 88.3142L1392.77 95.6767C1393.6 97.8994 1394.16 99.3349 1394.43 99.9831L1367.35 109.568C1361.23 90.1201 1351.69 78.127 1338.73 73.5891C1335.49 72.4778 1332.11 71.9221 1328.59 71.9221C1309.33 71.9221 1299.69 81.8314 1299.69 101.65C1299.69 110.726 1302.38 117.672 1307.75 122.488C1312.2 126.655 1318.03 129.943 1325.25 132.351L1331.92 134.573C1335.72 135.87 1337.8 136.564 1338.17 136.657L1344.29 138.741C1360.12 144.297 1370.82 149.205 1376.38 153.465C1384.52 159.763 1389.85 165.551 1392.35 170.83C1397.35 181.665 1399.85 193.103 1399.85 205.142C1399.85 214.588 1397.17 224.174 1391.79 233.898C1384.57 246.956 1373.13 255.522 1357.48 259.597C1351.46 261.172 1344.89 261.959 1337.76 261.959C1330.63 261.959 1323.91 261.311 1317.61 260.014C1311.41 258.717 1306.04 256.958 1301.5 254.735C1296.96 252.513 1292.79 249.966 1289 247.095C1285.2 244.224 1282 241.214 1279.41 238.065C1276.82 234.824 1274.55 231.629 1272.6 228.48C1270.66 225.239 1269.09 222.183 1267.88 219.312C1266.77 216.441 1265.84 213.894 1265.1 211.671C1264.36 209.449 1263.81 207.689 1263.44 206.392C1263.16 205.096 1262.97 204.448 1262.88 204.448Z"
        fill={activeTheme === "dark" ? "#e7e7e7" : "#09090B"}
      />
    </svg>
  );
};

export default Logo;
