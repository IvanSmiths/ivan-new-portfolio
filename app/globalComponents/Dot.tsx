import { FC } from "react";

type Dimension = {
  dimension: "small" | "regular";
};

const Dot: FC<Dimension> = ({ dimension }) => {
  return (
    <div
      className={`${dimension === "small" ? "w-1 h-1" : "w-1.5 h-1.5"} bg-primaryLight rounded-full`}
    ></div>
  );
};

export default Dot;
