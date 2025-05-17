import { dm_sans } from "../../../utils/fonts";
import { WorkProjectPage } from "../../../utils/pages/types";
import Link from "next/link";
import Row from "./Row";

type DetailsProps = {
  work: WorkProjectPage;
};

const Details = ({ work }: DetailsProps) => {
  return (
    <main className={`w-4/12 ${dm_sans.className} text-sm`}>
      {/*for the future me: the "s" is not a typo!*/}
      <Link href={`/${work.type.toLocaleLowerCase()}s`}>
        &#8592; All {work.type}
      </Link>
      <Row label={"Name"} value={work.name} />
    </main>
  );
};

export default Details;
