import type { WorkProjectPage } from "../../../utils/data/types";
import Row from "./Row";
import RowLabelList from "./RowLabelList";
import RowLinks from "./RowLinks";
import RowListParent from "./RowListParent";
import RowWorksDone from "./RowWorksDone";

type RowSectionProps = {
  work: WorkProjectPage;
};

const RowSection = ({ work }: RowSectionProps) => {
  return (
    <>
      <Row label={"Company"} value={work.name} />
      <Row label={"Date"} value={work.date} />
      <Row label={"Role"} value={work.role} />
      <RowLinks website={work.websiteLink} linkedin={work.linkedinLink} />
      {work.worksDone && work.worksDone.length > 0 && (
        <RowWorksDone worksDone={work.worksDone} />
      )}
      <RowLabelList stack={work.stack} />
      <RowListParent description={work.description} />
    </>
  );
};

export default RowSection;
