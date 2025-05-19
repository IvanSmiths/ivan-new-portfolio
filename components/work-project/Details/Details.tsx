import { dm_sans } from "../../../utils/fonts";
import { WorkProjectPage } from "../../../utils/pages/types";
import RowSection from "./RowSection";
import Breadcrumb from "../../global/Breadcrumb/Breadcrumb";

type DetailsProps = {
  work: WorkProjectPage;
};

const Details = ({ work }: DetailsProps) => {
  return (
    <main className={`w-3/12 ${dm_sans.className} top-xl sticky h-fit text-sm`}>
      {/*for the future me: the "s" is not a typo!*/}
      <Breadcrumb
        label={`<- All ${work.type}`}
        url={`/${work.type.toLowerCase()}s`}
      />
      <RowSection work={work} />
      <p>{work.description}</p>
    </main>
  );
};

export default Details;
