import { FC } from "react";

type Dimension = {
  dimension: "small" | "regular";
};

const Dot: FC<Dimension> = ({ dimension }) => {
  return (
    <div
      className={`${dimension === "small" ? "h-1 w-1" : "h-1.5 w-1.5"} bg-dark dark:bg-light rounded-full`}
    ></div>
  );
};

export default Dot;
