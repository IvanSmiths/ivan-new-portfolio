import { dm_mono } from "../../../../../../utils/style/fonts/fonts";

type WeatherData = {
	main: {
		temp: number;
	};
	weather: {
		main: string;
	}[];
};

type WeatherProps = {
	data: WeatherData | null;
};

function Weather({ data }: WeatherProps) {
	if (!data) {
		return null;
	}

	const { weather, main } = data;
	const temperature = Math.round(main.temp);
	const weatherDeg = weather[0].main;

	return (
		<div className="flex gap-1">
			<span
				className={`text-foreground-muted ${dm_mono.className} text-xs uppercase`}
			>
				{temperature}°
			</span>
			<span
				className={`text-foreground-muted ${dm_mono.className} text-xs uppercase`}
			>
				{weatherDeg}
			</span>
		</div>
	);
}

export default Weather;
