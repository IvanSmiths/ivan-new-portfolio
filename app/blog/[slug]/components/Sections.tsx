import { FC } from "react";

const Sections: FC = ({ children, ...props }: any) => {
  console.log(children);
  return (
    <div {...props}>
      <ul>{children}</ul>
    </div>
  );
};

export default Sections;
