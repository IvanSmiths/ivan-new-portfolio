import { FC } from "react";

const Blob: FC = () => {
  return (
    <div className="absolute -top-60 left-1/2 h-64 w-5/12 -translate-x-1/2 transform blur-[160px]">
      <div className="h-full w-full rounded-full bg-primary"></div>
    </div>
  );
};

export default Blob;
