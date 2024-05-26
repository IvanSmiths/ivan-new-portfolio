import { FC } from "react";

const Loading: FC = () => {
  const items: number[] = new Array(6).fill(0);

  return (
    <div className="absolute left-0 top-0 mt-small grid h-full w-full">
      <div className="col-span-full animate-pulse">
        <div className="col-span-full flex flex-wrap gap-small">
          {items.map((_, index) => (
            <div
              key={index}
              className="h-screen w-full flex-auto rounded-lg bg-primaryLight md:h-[500px] md:w-3/12 lg:h-[700px]"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
