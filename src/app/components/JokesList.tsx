"use client";
import { FormEvent, useState } from "react";
import { Joke } from "../models/Joke";
import styles from "./JokesList.module.css";

type SortableKeys = keyof Pick<Joke, "setup" | "punchline" | "type" | "rating">;

export const JokesList = ({ jokes }: { jokes: Joke[] }) => {
  const [jokeList, setJokeList] = useState<Joke[]>(jokes);
  const [newJoke, setNewJoke] = useState({
    setup: "",
    punchline: "",
    type: "",
    rating: "",
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jokesPerPage = 5;

  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: "asc" | "desc";
  } | null>(null);

  const sortedJokes = [...jokeList].sort((a, b) => {
    if (sortConfig !== null) {
      const key = sortConfig.key;
      if (a[key] < b[key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  const getJokesAndSetData = async () => {
    const res = await fetch(`api/jokes`, {
      cache: "no-cache",
    });
    const { jokes } = await res.json();
    setJokeList(jokes as Joke[]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/jokes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJoke),
      });

      if (response.ok) {
        setNewJoke({ setup: "", punchline: "", type: "", rating: "" });
        getJokesAndSetData();
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to add joke", error);
    }
  };

  const handleDeleteJoke = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/jokes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        getJokesAndSetData();
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to delete joke", error);
    }
  };
  const handleSort = (key: SortableKeys) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastJoke = currentPage * jokesPerPage;
  const indexOfFirstJoke = indexOfLastJoke - jokesPerPage;
  const currentJokes = sortedJokes.slice(indexOfFirstJoke, indexOfLastJoke);

  const totalPages = Math.ceil(jokeList.length / jokesPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={styles.pageButton}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={styles.container}>
      <h1>Jokes List</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort("setup")}>Setup</th>
            <th onClick={() => handleSort("punchline")}>Punchline</th>
            <th onClick={() => handleSort("type")}>Type</th>
            <th onClick={() => handleSort("rating")}>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentJokes.map((joke) => (
            <tr key={joke._id.toString()}>
              <td>{joke.setup}</td>
              <td>{joke.punchline}</td>
              <td>{joke.type}</td>
              <td>{joke.rating}</td>
              <td>
                <button
                  onClick={() => handleDeleteJoke(joke._id.toString())}
                  className={styles.button}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>{renderPageNumbers()}</div>
      {loading && <p>Loading...</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Add a New Joke</h2>
        <input
          type="text"
          placeholder="Setup"
          value={newJoke.setup}
          onChange={(e) => setNewJoke({ ...newJoke, setup: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Punchline"
          value={newJoke.punchline}
          onChange={(e) =>
            setNewJoke({ ...newJoke, punchline: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Type"
          value={newJoke.type}
          onChange={(e) => setNewJoke({ ...newJoke, type: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Rating"
          value={newJoke.rating}
          onChange={(e) => setNewJoke({ ...newJoke, rating: e.target.value })}
          required
        />
        <button type="submit">Add Joke</button>
      </form>
    </div>
  );
};
