import { JokesList } from "./components/JokesList";
import { Joke } from "./models/Joke";
import styles from "./page.module.css";

export const getJokes = async () => {
  const res = await fetch(`${process.env.SITE_URL}/api/jokes`, {
    cache: "no-cache",
  });
  const { jokes } = await res.json();
  return jokes as Joke[];
};

export default async function Home() {
  const jokes = await getJokes();
  return (
    <main className={styles.main}>
      <JokesList jokes={jokes} />
    </main>
  );
}
