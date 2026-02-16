type OpenWeatherResponse = {
  main: { temp: number };
  weather: { main: string }[];
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const city = getQuery(event).city?.toString() || "Wiesbaden";

  if (!config.openWeatherApiKey) {
    throw createError({ statusCode: 500, statusMessage: "Missing OPEN_WEATHER_API" });
  }
  try {
    const data = await $fetch<OpenWeatherResponse>(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        query: {
          q: city,
          appid: config.openWeatherApiKey,
          units: "metric",
        },
      },
    );
    setHeader(event, "Cache-Control", "s-maxage=600, stale-while-revalidate=3600");
    return {
      temp: Math.round(data.main.temp),
      condition: data.weather?.[0]?.main ?? "",
    };
  } catch (err: any) {
    throw createError({
      statusCode: 502,
      statusMessage: "Weather API failed",
      data: { message: err?.message },
    });
  }
});
