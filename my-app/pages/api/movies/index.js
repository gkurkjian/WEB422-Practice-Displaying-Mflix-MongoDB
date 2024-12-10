import { getMovies } from "@/lib/mongo/movies";

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { movies, error } = await getMovies();
            if (error) throw new Error(error);

            if (!movies || movies.length === 0) {
                return res.status(404).json({ error: "No movies found" });
            }

            return res.status(200).json({ movies });
        } catch (error) {
            console.error("Error fetching movies:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} is not allowed`);
};

export default handler;
