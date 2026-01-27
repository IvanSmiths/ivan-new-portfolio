import { useQuery } from "@tanstack/react-query";

export type WeatherData = {
	main: {
		temp: number;
	};
	weather: {
		main: string;
	}[];
};

async function fetchWeather(): Promise<WeatherData> {
	const res = await fetch("/api/weather");

	if (!res.ok) {
		throw new Error("Weather API failed");
	}

	return res.json();
}

export function useWeather() {
	return useQuery<WeatherData>({
		queryKey: ["weather"],
		queryFn: fetchWeather,
		staleTime: 1000 * 60 * 10, // 10 minutes
		retry: 2,
	});
}
