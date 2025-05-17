import { dm_sans } from "../../../utils/fonts";
import { WorkProjectPage } from "../../../utils/pages/types";
import Link from "next/link";
import Row from "./Row";
import RowLinks from "./RowLinks";
import RowWorksDone from "./RowWorksDone";

type DetailsProps = {
  work: WorkProjectPage;
};

const Details = ({ work }: DetailsProps) => {
  return (
    <main className={`w-3/12 ${dm_sans.className} top-sm sticky h-fit text-sm`}>
      {/*for the future me: the "s" is not a typo!*/}
      <Link href={`/${work.type.toLocaleLowerCase()}s`}>
        &#8592; All {work.type}
      </Link>
      <Row label={"Company"} value={work.name} />
      <Row label={"Description"} value={work.description} />
      <Row label={"Date"} value={work.date} />
      <Row label={"Role"} value={work.role} />
      <RowLinks website={work.websiteLink} linkedin={work.linkedinLink} />
      {work.worksDone && work.worksDone.length > 0 && (
        <RowWorksDone works={work.worksDone} />
      )}
    </main>
  );
};

export default Details;
