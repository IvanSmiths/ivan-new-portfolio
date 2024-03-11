"use client";

import { FC } from "react";
import { useIconDimensionStore, useThemeStore } from "../../utils/store";

const IconLinkedin: FC = () => {
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
        d="M0 2.86535C0 1.28329 1.32337 0 2.95592 0H37.0441C38.6766 0 40 1.28329 40 2.86535V37.1346C40 38.7172 38.6766 40 37.0441 40H2.95592C1.32337 40 0 38.7172 0 37.1346V2.86535Z"
        fill={activeTheme === "dark" ? "#ffffff" : "#09090B"}
      />
      <path
        d="M12.1097 33.4861V15.4238H6.06808V33.4861H12.1097ZM9.08888 12.9578C11.1957 12.9578 12.5071 11.5708 12.5071 9.83745C12.4678 8.06511 11.1957 6.71662 9.12885 6.71662C7.06218 6.71662 5.71094 8.06511 5.71094 9.83745C5.71094 11.5708 7.02199 12.9578 9.0495 12.9578H9.08888Z"
        fill={activeTheme === "dark" ? "#09090B" : "#ffffff"}
      />
      <path
        d="M15.4609 33.4861H21.5025V23.3994C21.5025 22.8595 21.5418 22.3202 21.7013 21.9344C22.1381 20.8558 23.1322 19.7387 24.8012 19.7387C26.9874 19.7387 27.8619 21.3951 27.8619 23.8232V33.4861H33.903V23.1295C33.903 17.5815 30.9224 15 26.9475 15C23.6882 15 22.2573 16.8103 21.4623 18.0433H21.5027V15.4238H15.4611C15.5404 17.1187 15.4609 33.4861 15.4609 33.4861Z"
        fill={activeTheme === "dark" ? "#09090B" : "#ffffff"}
      />
    </svg>
  );
};

export default IconLinkedin;
