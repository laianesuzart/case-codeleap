import HttpClient from "@/lib/http-client";

const baseUrl = import.meta.env.VITE_NINJAS_API_URL;
const client = new HttpClient(baseUrl);

type TimeResponse = {
  timezone: string;
  datetime: string;
  date: string;
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
  day_of_week: string;
};

export async function getServerTime() {
  const data = await client.get<TimeResponse>("/worldtime?timezone=Etc/UTC", {
    "X-Api-Key": import.meta.env.VITE_NINJAS_API_KEY,
  });
  return data;
}
