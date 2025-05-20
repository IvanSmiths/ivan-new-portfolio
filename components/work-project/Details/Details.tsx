import { dm_sans } from "../../../utils/fonts";
import { WorkProjectPage } from "../../../utils/pages/types";
import RowSection from "./RowSection";
import Breadcrumb from "../../global/Breadcrumb/Breadcrumb";

type DetailsProps = {
  work: WorkProjectPage;
};

const Details = ({ work }: DetailsProps) => {
  return (
    <main
      className={`w-4/12 ${dm_sans.className} top-xl border-t-background-muted border-r-background-muted border-b-background-muted sticky h-[94vh] border-t border-r border-b text-sm`}
    >
      {/*for the future me: the "s" is not a typo!*/}
      <Breadcrumb
        label={`All ${work.type}s`}
        url={`/${work.type.toLowerCase()}s`}
      />
      <RowSection work={work} />
      <p className="pt-md">{work.description}</p>
    </main>
  );
};

export default Details;
