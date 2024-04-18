import { FC } from "react";

const Blob: FC = () => {
  return (
    <div className="w-5/12 h-64 absolute -top-60 left-1/2 transform blur-[160px] -translate-x-1/2">
      <div className="bg-primary w-full h-full rounded-full"></div>
    </div>
  );
};

export default Blob;
