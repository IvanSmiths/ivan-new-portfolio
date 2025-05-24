import Row from "./Row";
import RowLinks from "./RowLinks";
import RowWorksDone from "./RowWorksDone";
import { WorkProjectPage } from "../../../utils/pages/types";
import RowListParent from "./RowListParent";

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
      <RowListParent description={work.description} />
    </>
  );
};

export default RowSection;
