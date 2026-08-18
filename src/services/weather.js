import { trip } from '../data/trip'

const WEATHER_CACHE_KEY = 'bts-sydney-weather'

export function getCachedWeather() {
  const raw = localStorage.getItem(WEATHER_CACHE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export async function fetchSydneyWeather() {
  const { latitude, longitude, timezone } = trip.weatherLocation
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    timezone,
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum',
    forecast_days: '7',
  })

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)
  if (!response.ok) throw new Error('Weather request failed')

  const payload = await response.json()
  const weather = {
    fetchedAt: new Date().toISOString(),
    current: payload.current,
    currentUnits: payload.current_units,
    daily: payload.daily,
  }

  localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(weather))
  return weather
}

export function describeWeather(code) {
  if ([0].includes(code)) return 'Clear'
  if ([1, 2, 3].includes(code)) return 'Partly cloudy'
  if ([45, 48].includes(code)) return 'Fog'
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle'
  if ([61, 63, 65, 66, 67].includes(code)) return 'Rain'
  if ([71, 73, 75, 77].includes(code)) return 'Snow'
  if ([80, 81, 82].includes(code)) return 'Showers'
  if ([95, 96, 99].includes(code)) return 'Storms'
  return 'Weather'
}
