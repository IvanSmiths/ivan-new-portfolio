export async function getWeather() {
  try {
    const res: Response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Wiesbaden&appid=${process.env.OPEN_WEATHER_API}&units=metric`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error(`Weather API failed: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Weather fetch error:", error);
    return null;
  }
}
