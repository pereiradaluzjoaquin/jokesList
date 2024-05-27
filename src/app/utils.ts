import { Joke } from "./models/Joke";

export const getJokes = async () => {
  const res = await fetch(`${process.env.SITE_URL}/api/jokes`, {
    cache: "no-cache",
  });
  const { jokes } = await res.json();
  return jokes as Joke[];
};
