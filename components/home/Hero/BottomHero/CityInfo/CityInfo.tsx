import type { FC } from "react";
import { useWeather } from "../../../../../utils/hooks/useWeather";
import { dm_mono } from "../../../../../utils/style/fonts/fonts";
import Time from "./Time";
import Weather from "./Weather/Weather";

const CityInfo: FC = () => {
	const { data: weather, isLoading, error } = useWeather();

	return (
		<div className="mt-sm gap-md flex">
			<span
				className={`text-foreground-muted ${dm_mono.className} text-xs uppercase`}
			>
				Wiesbaden(DE)
			</span>
			<Weather data={weather || null} />
			<Time />
		</div>
	);
};

export default CityInfo;
