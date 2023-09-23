import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const OPEN_WEATHER_API = process.env.OPEN_WEATHER_API
    const {method} = req;
    if (method === 'GET') {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Wiesbaden,de&appid=${OPEN_WEATHER_API}`);
        const data = await response.json();
        res.status(200).json(data);
    } else {
        res.status(405).json({message: 'Method not allowed'});
    }
}
