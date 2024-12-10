import { useState, useEffect } from "react";

export default function HeaderFetcher() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await fetch("/api/movies");
                if (!response.ok) throw new Error("Failed to fetch movies");
                const data = await response.json();
                setMovies(data.movies);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchMovies();
    }, []);

    if (loading) return <p>Loading movies...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <ul>
                {movies.map((movie) => (
                    <li key={movie._id}>{movie.title}</li>
                ))}
            </ul>
        </>
    );
}
