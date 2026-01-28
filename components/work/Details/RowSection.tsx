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
			<Row className="animate-fadeInUp" label={"Company"} value={work.name} />
			<Row
				className="animate-fadeInUp [animation-delay:100ms]"
				label={"Date"}
				value={work.date}
			/>
			<Row
				className="animate-fadeInUp [animation-delay:200ms]"
				label={"Role"}
				value={work.role}
			/>
			<RowLinks
				className="animate-fadeInUp [animation-delay:300ms]"
				website={work.websiteLink}
				linkedin={work.linkedinLink}
			/>
			{work.worksDone && work.worksDone.length > 0 && (
				<RowWorksDone
					className="animate-fadeInUp [animation-delay:400ms]"
					worksDone={work.worksDone}
				/>
			)}
			<RowLabelList
				className="animate-fadeInUp [animation-delay:500ms]"
				stack={work.stack}
			/>
			<RowListParent
				className="animate-fadeInUp [animation-delay:600ms]"
				description={work.description}
			/>
		</>
	);
};

export default RowSection;
