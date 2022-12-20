import { fetcher } from "utils/api";

const getSearchMovieUrl = (id) =>
  `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;

export default async function handler(req, res) {
  const results = await fetcher(getSearchMovieUrl(req.query.id));

  res.status(200).json(results);
}
