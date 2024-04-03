import { FC } from "react";

const Blob: FC = () => {
  return (
    <div className="w-5/12 h-64 absolute -top-40 left-1/2 transform blur-[150px] md:blur-[200px] lg:blur-[300px] bg-primaryLight -translate-x-1/2">
      <div className="bg-primaryLight w-full h-full rounded-full"></div>
    </div>
  );
};

export default Blob;
