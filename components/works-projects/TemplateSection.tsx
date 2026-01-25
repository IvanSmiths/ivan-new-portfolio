"use client";

import { type FC, useRef } from "react";
import type { WorkProjectBase } from "../../utils/data/types";
import { useHorizontalScrollWithText } from "../../utils/hooks/animations/useHorizontalScrollWithText";
import TemplateItemWrapper from "./TemplateItemWrapper";
import TemplateNavigation from "./TemplateNavigation";
import TemplateText from "./TemplateText";

type WorksProps = {
	works: WorkProjectBase[];
	path: string;
};

const TemplateSection: FC<WorksProps> = ({ works, path }) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const triggerRef = useRef<HTMLDivElement | null>(null);
	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const subtitleRef = useRef<HTMLHeadingElement | null>(null);

	const { currentIndex, scrollToItem } = useHorizontalScrollWithText({
		items: works,
		containerRef,
		triggerRef,
		titleRef,
		subtitleRef,
	});

	return (
		<div className="overflow-hidden pt-1">
			<div className="relative" ref={triggerRef}>
				<TemplateItemWrapper
					works={works}
					path={path}
					containerRef={containerRef}
				/>
				<TemplateText
					work={works[currentIndex] || works[0]}
					path={path}
					titleRef={titleRef}
					subtitleRef={subtitleRef}
				/>
				<TemplateNavigation
					works={works}
					currentIndex={currentIndex}
					onNavigate={scrollToItem}
				/>
			</div>
		</div>
	);
};

export default TemplateSection;
