// api/movie.js
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const { search, imdbID } = req.query;
    const apiKey = process.env.OMDB_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    let url;
    if (imdbID) {
        url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;
    } else if (search) {
        url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(search)}`;
    } else {
        return res.status(400).json({ error: 'Missing search or imdbID parameter' });
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch from OMDB' });
    }
}