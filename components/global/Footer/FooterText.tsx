import { dm_mono } from "../../../utils/style/fonts/fonts";

const FooterText = () => {
	return (
		<div className="flex justify-between">
			<span className={`${dm_mono.className} text-xs uppercase`}>
				©2025 Ivan Smiths
			</span>
			<span className={`${dm_mono.className} text-xs uppercase`}>
				Rocking Since 2020 💪
			</span>
		</div>
	);
};

export default FooterText;
