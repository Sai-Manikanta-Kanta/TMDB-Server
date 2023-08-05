// Importing Express Module
const express = require('express');
// Importing Axios Module 
const axios = require('axios');
// Importing dotenv module for handling environmental variables
require('dotenv').config()
//importing cors module
const cors=require('cors');
// Creating an Express Application
const app = express();
const port = 3007;
const tmdb_api_key = process.env.TMDB_API_KEY;
app.use(cors())

// API that accepts a http GET request with movie name as param and responds with movies 
//list that are matching with the query movie name
app.get('/search/movies/:movieName', async (req, res) => {
    const movieName = req.params.movieName;
    try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie',

            {
                params:
                {
                    api_key: tmdb_api_key,
                    query: movieName
                }
            }

        )

        const movies = response.data.results;
        res.json(movies)

    }
    catch (error) {
        console.error('Error fetching movies from TMDb:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }




})


//API to get all the trending movies with respect to present day
app.get('/movies/trending/day', async (req, res) => {

    try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/all/day',

            {
                params:
                {
                    api_key: tmdb_api_key,

                }
            }

        )
        const movies = response.data.results;
        res.json(movies)

    }
    catch (error) {
        console.error('Error fetching movies from TMDb:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})
// API to get movies list that are trending with respect to present week
app.get('/movies/trending/week', async (req, res) => {

    try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/all/week',

            {
                params:
                {
                    api_key: tmdb_api_key,

                }
            }

        )

        const movies = response.data.results;
        res.json(movies)

    }
    catch (error) {
        console.error('Error fetching movies from TMDb:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }




})
// Server Listening requests to the specified port and host
app.listen(port, () => console.log(`App listening on port ${port}!`));