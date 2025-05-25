import { FC, Key } from "react";
import { WorkProjectBase } from "../../utils/pages/types";

type WorkProps = {
  work: WorkProjectBase;
  index: Key;
  path?: string;
};

const TemplateMapped: FC<WorkProps> = ({ work, index, path }) => {
  return <div></div>;
};

export default TemplateMapped;
