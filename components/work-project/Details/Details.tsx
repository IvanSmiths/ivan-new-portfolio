import { dm_sans } from "../../../utils/fonts/fonts";
import { WorkProjectPage } from "../../../utils/pages/types";
import RowSection from "./RowSection";
import Breadcrumb from "../../global/Breadcrumb/Breadcrumb";

type DetailsProps = {
  work: WorkProjectPage;
};

const Details = ({ work }: DetailsProps) => {
  return (
    <main
      className={`w-full border-l max-sm:border-l lg:w-5/12 ${dm_sans.className} top-xl pb-sm border-background-muted border text-sm lg:sticky lg:h-[94vh]`}
    >
      {/*for the future me: the "s" is not a typo!*/}
      <Breadcrumb
        label={`All ${work.type}s`}
        url={`/${work.type.toLowerCase()}s`}
      />
      <RowSection work={work} />
    </main>
  );
};

export default Details;
