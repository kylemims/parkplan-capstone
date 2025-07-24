export const getMonthlyWeatherAverages = (lat, lon) => {
  const year = 2022;
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${year}-01-01&end_date=${year}-12-31&daily=temperature_2m_mean,precipitation_sum&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=auto`;

  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`Weather API request failed: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log("✅ Daily data response:", data);

      if (!data.daily) {
        throw new Error("No daily weather data available");
      }

      // Convert daily to monthly averages
      const daily = data.daily;
      const monthlyData = {};

      daily.time.forEach((date, index) => {
        const month = new Date(date).getMonth();
        if (!monthlyData[month]) {
          monthlyData[month] = {
            temps: [],
            precips: [],
            month: new Date(date).toLocaleString("default", { month: "short" }),
          };
        }
        if (daily.temperature_2m_mean[index] !== null)
          monthlyData[month].temps.push(daily.temperature_2m_mean[index]);
        if (daily.precipitation_sum[index] !== null)
          monthlyData[month].precips.push(daily.precipitation_sum[index]);
      });

      return Object.values(monthlyData).map((month) => ({
        month: month.month,
        temp: month.temps.length
          ? (month.temps.reduce((a, b) => a + b) / month.temps.length).toFixed(1)
          : "N/A",
        precip: month.precips.length ? month.precips.reduce((a, b) => a + b).toFixed(2) : "N/A",
      }));
    });
};
