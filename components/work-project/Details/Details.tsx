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
      className={`w-full md:w-4/12 ${dm_sans.className} pl-sm top-xl border-background-muted border text-sm md:sticky md:h-[95vh]`}
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
