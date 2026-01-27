import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	_req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=Wiesbaden&appid=${process.env.OPEN_WEATHER_API}&units=metric`,
		);

		if (!response.ok) {
			return res.status(response.status).json({ error: "Weather API failed" });
		}

		const data = await response.json();
		res.status(200).json(data);
	} catch {
		res.status(500).json({ error: "Internal server error" });
	}
}
