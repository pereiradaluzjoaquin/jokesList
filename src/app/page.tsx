import { JokesList } from "./components/JokesList";
import styles from "./page.module.css";
//import { getJokes } from "./utils";

export default async function Home() {
  //const jokes = await getJokes();
  return (
    <main className={styles.main}>
      <JokesList jokes={[]} />
    </main>
  );
}
