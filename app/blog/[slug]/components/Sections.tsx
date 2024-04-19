import { FC } from "react";

const Sections: FC = ({ children, ...props }: any) => {
  console.log(children);
  return (
    <div {...props} className="absolute h-full top-medium mt-small left-0 z-40">
      <div className="sticky top-1/4 flex flex-col">{children}</div>
    </div>
  );
};

export default Sections;
